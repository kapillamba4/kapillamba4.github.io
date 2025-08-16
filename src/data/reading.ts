export interface ReadingItem {
    title: string;
    author: string;
    type: "book" | "paper";
    status: "reading" | "finished";
    link?: string;
  }
  
export const readingData: ReadingItem[] = [
    {
      title: "Database Internals: A Deep Dive into How Distributed Data Systems Work",
      author: "Alex Petrov",
      type: "book",
      status: "reading",
      link: "https://www.amazon.com/Database-Internals-Deep-Distributed-Systems/dp/1492040347"
    },
    {
      title: "Prometheus: Up & Running, 2nd Edition",
      author: "Brian Brazil",
      type: "book",
      status: "finished",
      link: "https://www.amazon.com/Prometheus-Infrastructure-Application-Performance-Monitoring/dp/1492034142"
    },
    {
      title: "Programming: Principles and Practice Using C++",
      author: "Bjarne Stroustrup",
      type: "book",
      status: "finished",
      link: "https://www.amazon.com/Programming-Principles-Practice-Using-2nd/dp/0321992784"
    },
    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      type: "book",
      status: "finished",
      link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
    },
    {
      title: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
      author: "Robert C. Martin",
      type: "book",
      status: "finished",
      link: "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
    }
  ];
  