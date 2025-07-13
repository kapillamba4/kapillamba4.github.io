import { useState, useEffect } from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
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
    let text = htmlDescription
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
          const formattedPosts = data.items.slice(0, 6).map((item: any) => ({
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Writing</h1>
          <p className="text-lg text-muted-foreground">Loading latest posts...</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.pubDate)}</span>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {post.description}
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read on Medium
                </a>
              </Button>
            </CardContent>
          </Card>
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
