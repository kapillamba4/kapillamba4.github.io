import { Github, Linkedin, FileText, Mail, Briefcase, GraduationCap, Award, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
              <p className="text-muted-foreground">Senior Backend Engineer</p>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-2">
                <MapPin className="h-3 w-3" />
                <span>Bangalore, India</span>
              </div>
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

      {/* Work Experience Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Work Experience</h3>
          </div>
          
          <div className="space-y-6">
            {/* Target */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Senior Engineer - Target</h4>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Sep 2024 - Present</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flipkart */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Software Engineer 2 - Flipkart</h4>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Feb 2022 - Sep 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brevo */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Software Engineer - Brevo</h4>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>Noida, India</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Jun 2020 - Jan 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Education</h3>
          </div>
          
          <div className="border-l-2 border-primary pl-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">Bachelor of Technology - Computer Science</h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>Delhi, India</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>2016 - 2020</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Achievements & Recognition</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Global Contest</Badge>
                  <span className="text-sm font-medium">Global Rank 28 - IEEEXtreme 12.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Contest</Badge>
                  <span className="text-sm font-medium">Ranked 17 - ACM ICPC Asia Kolkata-Kanpur 2018</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Contest</Badge>
                  <span className="text-sm font-medium">Ranked 22 - ACM ICPC Asia Amritapuri 2018</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Contest</Badge>
                  <span className="text-sm font-medium">Ranked 54 - ACM ICPC Asia Amritapuri 2017</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Contest</Badge>
                  <span className="text-sm font-medium">Ranked 110 - TCS Code Vita 2018</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "System Design", "Algorithms", "Data Structures", "API Development", 
                  "System Scalability", "Reliability", "Microservices", "Golang", 
                  "Java", "Kafka", "RabbitMQ", "Redis", "PostgreSQL", "MongoDB", 
                  "ClickHouse", "Docker", "Kubernetes", "Terraform"
                ].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
