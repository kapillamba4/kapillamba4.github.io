import { Book, FileText, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { readingData, ReadingItem } from "../data/reading";

const Reading = () => {
  const renderReadingCard = (item: ReadingItem) => {
    const TypeIcon = item.type === "book" ? Book : FileText;
    const statusColor = item.status === "finished" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    const StatusIcon = item.status === "finished" ? CheckCircle : Clock;

    return (
      <article
        key={`${item.title}-${item.author}`}
        className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md"
      >
        <header className="pb-3">
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
          <h3 className="mt-2 text-lg font-semibold leading-snug">{item.title}</h3>
          <p className="text-sm text-muted-foreground">by {item.author}</p>
        </header>
        <div className="mt-3 grow" />
        {item.link && (
          <footer className="mt-4">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm underline underline-offset-2 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View {item.type === "book" ? "Book" : "Paper"}
            </a>
          </footer>
        )}
      </article>
    );
  };

  const books = readingData.filter(item => item.type === "book");
  const papers = readingData.filter(item => item.type === "paper");

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Shelf</h1>
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
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
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
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            {papers.map(renderReadingCard)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Reading;
