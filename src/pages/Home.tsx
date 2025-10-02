import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, FileText, User, ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileData {
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  company?: string;
}

const Home = () => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    {
      title: "About",
      description: "Learn more about my background and experience",
      icon: User,
      href: "/about",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Projects",
      description: "Explore my personal projects and apps",
      icon: Code,
      href: "/projects",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Reading",
      description: "My personal library of books and research papers",
      icon: Book,
      href: "/reading",
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      title: "Writing",
      description: "Thoughts and writings on tech and development",
      icon: FileText,
      href: "/writing",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Try to fetch from the Weekday profile page
        const response = await fetch('https://www.weekday.works/people/kapil-lamba-kapillamba4');
        const html = await response.text();
        
        // Basic parsing to extract profile information
        // This is a simplified approach - in production, you might want to use a proper HTML parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract basic information (this may need adjustment based on actual HTML structure)
        const titleElement = doc.querySelector('title');
        const metaDescription = doc.querySelector('meta[name="description"]');
        
        console.log('Fetched profile data:', { titleElement, metaDescription });
        
        // Set fallback data for now
        setProfileData({
          name: "Kapil",
          title: "Backend Engineer",
          bio: "Passionate about building scalable systems, contributing to open-source projects, and exploring data structures and algorithms.",
          location: "India",
          company: "Flipkart"
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Fallback data
        setProfileData({
          name: "Kapil",
          title: "Backend Engineer",
          bio: "Passionate about building scalable systems, contributing to open-source projects, and exploring data structures and algorithms.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Hey, I am {profileData.name || "Kapil"}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          {profileData.title || "Backend Engineer"}, Open-Source & DSA Enthusiast
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {profileData.bio || "Passionate about building scalable systems, contributing to open-source projects, and exploring data structures and algorithms."}
        </p>
        {profileData.location && (
          <p className="text-sm text-muted-foreground">
            📍 {profileData.location}
          </p>
        )}
      </section>

      {/* Navigation Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-muted-foreground mt-2">{section.description}</p>
                  </div>
                  <Link to={section.href}>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-accent">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
