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

// Returns the text inside the first <name>…</name>, unwrapping CDATA.
const readTag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  if (!match) return "";
  const value = match[1].trim();
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decodeEntities(value);
};

// First sentence of the post body, as plain text. Images and any heading the
// post opens with (usually the title again) are skipped.
const toExcerpt = (html) => {
  const text = decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/g, "")
      .replace(/^(\s*<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)+/, "")
      .replace(/<\/(p|h[1-6]|blockquote)>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<li>/g, "• ")
      .replace(/<\/li>/g, "\n")
      .replace(/<[^>]*>/g, "")
  ).trim();

  const firstSentence = text.split(/[.!?]+/)[0].trim();
  return firstSentence && !/[.!?]$/.test(firstSentence) ? `${firstSentence}.` : firstSentence;
};

const parseFeed = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
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
  if (posts.some((post) => !post.title || !post.link)) throw new Error("feed had a post with no title or link");

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
