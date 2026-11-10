// Downloads the latest Medium posts into src/data/medium-posts.json.
//
// The Writing page reads that file instead of calling a feed proxy in the
// browser, so it keeps working when proxies like rss2json get rate-limited.
// The deploy workflow runs this before each build. If the fetch fails, the
// existing file is kept and the build carries on with it.
import { readFile, writeFile } from "node:fs/promises";

const FEED_URL = "https://medium.com/feed/@kapillamba4";
const OUT_FILE = new URL("../src/data/medium-posts.json", import.meta.url);

const decodeEntities = (text) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&");

// Returns the text inside the first <name …>…</name>, unwrapping CDATA.
const readTag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  if (!match) return "";
  const value = match[1].trim();
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decodeEntities(value);
};

// Excerpt length, in characters: keep adding whole sentences until at least
// MIN, without going over MAX.
const EXCERPT_MIN = 140;
const EXCERPT_MAX = 240;

const truncate = (text, max) =>
  text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

// The opening sentences of a post, as plain text. This is only a fallback for
// posts with no hand-written summary in src/data/medium-summaries.ts, since
// posts often open with a hook rather than a description.
const toExcerpt = (html) => {
  // Opening prose only: skip images and any heading the post opens with
  // (usually the title again), and stop at the first section heading, list
  // or code block.
  const intro = html
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/^(\s*<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)+/, "")
    .split(/<(?:h[1-6]|ul|ol|pre)[\s>]/)[0];
  const text = decodeEntities(
    intro.replace(/<br\s*\/?>|<\/(?:p|blockquote)>/g, " ").replace(/<[^>]*>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();

  let excerpt = "";
  for (const sentence of text.split(/(?<=[.!?]["'”’)]?)\s+(?=["'“‘(]?[A-Z0-9])/)) {
    // Stop at an unfinished sentence, such as a lead-in to a list.
    if (!/[.!?]["'”’)]?$/.test(sentence)) break;
    const next = excerpt ? `${excerpt} ${sentence}` : sentence;
    if (excerpt && next.length > EXCERPT_MAX) break;
    excerpt = next;
    if (excerpt.length >= EXCERPT_MIN) break;
  }
  return truncate(excerpt || text, EXCERPT_MAX + 60);
};

const parseFeed = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    // Medium's post id, e.g. "0a0ca70c6440" from https://medium.com/p/0a0ca70c6440.
    id: readTag(item, "guid").split("/").pop(),
    title: decodeEntities(readTag(item, "title")),
    // Drop Medium's ?source=rss… tracking parameter.
    link: readTag(item, "link").replace(/\?source=rss[^#]*/, ""),
    pubDate: new Date(readTag(item, "pubDate")).toISOString(),
    excerpt: toExcerpt(readTag(item, "content:encoded")),
  }));

const warn = (message) => {
  // Shows up as a warning annotation on the GitHub Actions run.
  console.warn(process.env.GITHUB_ACTIONS ? `::warning::${message}` : `Warning: ${message}`);
};

try {
  const response = await fetch(FEED_URL, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const posts = parseFeed(await response.text());
  if (posts.length === 0) throw new Error("feed had no posts");
  if (posts.some((post) => !post.id || !post.title || !post.link)) {
    throw new Error("feed had a post with no id, title or link");
  }

  const json = `${JSON.stringify(posts, null, 2)}\n`;
  const previous = await readFile(OUT_FILE, "utf8").catch(() => "");
  if (json === previous) {
    console.log(`Medium posts unchanged (${posts.length} posts).`);
  } else {
    await writeFile(OUT_FILE, json);
    console.log(`Saved ${posts.length} Medium posts to src/data/medium-posts.json.`);
  }
} catch (error) {
  warn(`Could not fetch Medium posts (${error.message}). Keeping the existing src/data/medium-posts.json.`);
}
