import { Book, FileText, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { readingData, ReadingItem } from "../data/reading";

const Reading = () => {
  const renderReadingCard = (item: ReadingItem) => {
    const TypeIcon = item.type === "book" ? Book : FileText;
    const statusColor = item.status === "finished" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    const StatusIcon = item.status === "finished" ? CheckCircle : Clock;

    return (
      <Card key={`${item.title}-${item.author}`} className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <TypeIcon className="h-5 w-5 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
            </div>
            <Badge className={`text-xs ${statusColor}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {item.status}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
          <p className="text-sm text-muted-foreground">by {item.author}</p>
        </CardHeader>
        {item.link && (
          <CardContent className="pt-0">
            <Button variant="ghost" size="sm" asChild className="w-full justify-start">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View {item.type === "book" ? "Book" : "Paper"}
              </a>
            </Button>
          </CardContent>
        )}
      </Card>
    );
  };

  const books = readingData.filter(item => item.type === "book");
  const papers = readingData.filter(item => item.type === "paper");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">PaperShelf</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My personal collection of books and research papers that have shaped my understanding 
          of computer science and software engineering.
        </p>
      </div>

      {/* Books Section - Only show if there are books */}
      {books.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Books</h2>
            <Badge variant="secondary">{books.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(renderReadingCard)}
          </div>
        </section>
      )}

      {/* Papers Section - Only show if there are papers */}
      {papers.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Research Papers</h2>
            <Badge variant="secondary">{papers.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map(renderReadingCard)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Reading;
