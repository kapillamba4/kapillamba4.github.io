
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
        <p className="text-lg text-muted-foreground">
          Get to know more about my journey and interests
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src="/image.png" alt="Kapil Lamba" />
              <AvatarFallback className="text-2xl">KL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Kapil Lamba</h2>
              <p className="text-muted-foreground">Backend Engineer</p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/kapillamba4" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://linkedin.com/in/kapillamba4" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://medium.com/@kapillamba4" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bio Content */}
        <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a senior backend engineer with experience building scalable and resilient systems at companies like
                Target, Flipkart, and Brevo. My work spans orchestration platforms, UPI integration, large-scale API gateways,
                and data-intensive backends.
              </p>
              <p>
                I specialize in system design, performance optimization, and delivering solutions that are reliable, maintainable,
                and impactful. My tech stack includes Golang, Java, Kafka, RabbitMQ, Redis, PostgreSQL, MongoDB, ClickHouse, Kubernetes, and Terraform.
              </p>
              <p>
                Outside of work, I enjoy reading engineering blogs, solving interesting coding problems to sharpen my thinking, and exploring new tools and frameworks.
                I'm passionate about clean architecture, developer experience, and building resilient systems that scale.
              </p>
            </div>
        </CardContent>
      </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Interests & Focus Areas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Technical</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Distributed Systems</li>
                    <li>• Backend Development</li>
                    <li>• System Design</li>
                    <li>• Data Structures & Algorithms</li>
                    <li>• Database Optimization</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Community</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Technical Reading & Writing </li>
                    <li>• Sharing Knowledge </li>
                    <li>• Open Source </li>
                    <li>• Mentorship </li>
                    <li>• Fostering Engineering Best Practices and Team Ownership </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
