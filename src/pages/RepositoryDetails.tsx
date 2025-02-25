
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, GitFork, Eye, BookOpen, History, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

// Mock data for demonstration
const repository = {
  name: "next.js",
  description: "The React Framework for Production. The foundation for fast, modern web applications. Built by Vercel and over 2900 contributors.",
  stars: 98245,
  forks: 24150,
  watchers: 1523,
  language: "TypeScript",
  lastUpdated: "2 days ago",
  contributors: 2943,
  readme: `# Next.js

  The React Framework for Production...
  
  ## Getting Started
  Visit [https://nextjs.org/docs](https://nextjs.org/docs) to get started with Next.js.
  
  ## Documentation
  Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.`,
  techStack: ["React", "TypeScript", "Node.js", "Webpack"],
  license: "MIT"
};

const RepositoryDetails = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{repository.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {repository.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Star className="mr-2" />
                  Star
                </Button>
                <Button variant="outline">
                  <GitFork className="mr-2" />
                  Fork
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{repository.stars.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Stars</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <GitFork className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{repository.forks.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Forks</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{repository.watchers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Watchers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tech Stack
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {repository.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Activity
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last updated</span>
                      <span className="text-sm">{repository.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contributors</span>
                      <span className="text-sm">{repository.contributors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">License</span>
                      <span className="text-sm">{repository.license}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* README Section */}
            <Card className="mb-8">
              <CardHeader className="pb-2">
                <h3 className="font-semibold">README.md</h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap">{repository.readme}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepositoryDetails;
