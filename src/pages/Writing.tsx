import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
// Saved at build time by scripts/fetch-medium-posts.mjs.
import posts from "@/data/medium-posts.json";
import { mediumSummaries } from "@/data/medium-summaries";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const Writing = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Writing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Thoughts, insights, and experiences from my journey in software development,
          backend engineering, and technology exploration.
        </p>
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <a href="https://kapillamba4.medium.com/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All on Medium
          </a>
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        {posts.map((post) => (
          <article
            key={post.link}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md"
          >
            <header>
              <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.pubDate)}</span>
              </div>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </header>
            <div className="mt-3 grow">
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {mediumSummaries[post.id] ?? post.excerpt}
              </p>
            </div>
            <footer className="mt-4">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm underline underline-offset-2 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Read on Medium
              </a>
            </footer>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts available at the moment.</p>
          <Button asChild className="mt-4">
            <a href="https://kapillamba4.medium.com/" target="_blank" rel="noopener noreferrer">
              Visit Medium Profile
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Writing;
