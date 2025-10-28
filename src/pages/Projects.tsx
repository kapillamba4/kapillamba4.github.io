import { ExternalLink, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  links?: ProjectLink[];
  category: string;
  tags: string[];
  year: string;
  image?: string;
  status: "Live" | "In Development" | "Beta Testing" | "Completed";
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: "vitality-app-web",
      title: "Vitality App - Web",
      description: "A comprehensive wellness platform focused on overall health. Features personalized wellness tracking, mindfulness exercises, and holistic health insights.",
      url: "https://vitalityapp.fit/",
      category: "Health & Wellness",
      tags: ["Vite", "React", "Supabase", "PostgreSQL", "Node.js", "OpenAI"],
      year: "2025",
      status: "Live"
    },
    {
      id: "vitality-app-native",
      title: "Vitality App - Native",
      description:
        "iOS and Android mobile applications for the Vitality wellness platform. Now live on the App Store and Google Play, bringing comprehensive health tracking and mindfulness exercises to your pocket.",
      links: [
        {
          label: "Download on the App Store",
          url: "https://apps.apple.com/us/app/vitality-body-mind/id6749547421"
        },
        {
          label: "Get it on Google Play",
          url: "https://play.google.com/store/apps/details?id=com.vitality.app"
        }
      ],
      category: "Health & Wellness",
      tags: ["Vite", "React", "Supabase", "PostgreSQL", "Node.js", "OpenAI"],
      year: "2025",
      status: "Live"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
      case "Beta Testing":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "In Development":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Completed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Personal Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          A collection of projects I've built, ranging from apps to open-source contributions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{project.category}</span>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed text-left">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {project.links ? (
                <div className="grid gap-2">
                  {project.links.map((link) => (
                    <Button
                      key={link.url}
                      asChild
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {link.label}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              ) : project.url ? (
                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
