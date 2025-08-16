import { useState, useEffect } from "react";
import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

const Writing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDescription = (htmlDescription: string): string => {
    // Remove HTML tags but preserve some structure
    const text = htmlDescription
      .replace(/<\/p>/g, '\n\n') // Convert closing p tags to double line breaks
      .replace(/<\/h[1-6]>/g, '\n\n') // Convert closing header tags to double line breaks
      .replace(/<br\s*\/?>/g, '\n') // Convert br tags to line breaks
      .replace(/<li>/g, '• ') // Convert list items to bullet points
      .replace(/<\/li>/g, '\n') // Add line breaks after list items
      .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Replace HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    // Get first sentence only
    const sentences = text.split(/[.!?]+/);
    let firstSentence = sentences[0].trim();
    
    // Ensure it ends with a full stop if it doesn't already end with punctuation
    if (firstSentence && !firstSentence.match(/[.!?]$/)) {
      firstSentence += '.';
    }

    return firstSentence;
  };

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        // Using a CORS proxy to fetch Medium RSS feed
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kapillamba4`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        
        const data = await response.json();
        
        if (data.status === "ok") {
          const formattedPosts = data.items.slice(0, 6).map((item: RSSItem) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: formatDescription(item.description),
            thumbnail: item.thumbnail || "/placeholder.svg",
          }));
          
          setPosts(formattedPosts);
        } else {
          throw new Error("RSS feed returned error status");
        }
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError("Unable to load blog posts at the moment. Please visit my Medium profile directly.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Writing</h1>
          <p className="text-lg text-muted-foreground">Loading latest posts...</p>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {[...Array(6)].map((_, i) => (
            <article
              key={i}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <header className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </header>
              <div className="mt-3 grow">
                <Skeleton className="h-20 w-full" />
              </div>
              <footer className="mt-4">
                <Skeleton className="h-4 w-24" />
              </footer>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Writing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Thoughts, insights, and experiences from my journey in software development, 
          backend engineering, and technology exploration.
        </p>
        {error && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-sm">
            <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <a href="https://medium.com/@kapillamba4" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All on Medium
          </a>
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        {posts.map((post, index) => (
          <article
            key={index}
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
                {post.description}
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

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts available at the moment.</p>
          <Button asChild className="mt-4">
            <a href="https://medium.com/@kapillamba4" target="_blank" rel="noopener noreferrer">
              Visit Medium Profile
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Writing;
