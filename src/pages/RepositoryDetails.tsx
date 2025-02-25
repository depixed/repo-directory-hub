import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, GitFork, Eye, BookOpen, History, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demonstration
const repository = {
  name: "next.js",
  description: "The React Framework for Production. The foundation for fast, modern web applications. Built by Vercel and over 2900 contributors.",
  stars: 98245,
  forks: 24150,
  watchers: 1523,
  language: "TypeScript",
  lastUpdated: "2 days ago",
  contributors: [
    { username: "tim", name: "Tim", avatar: "https://github.com/timothee.png" },
    { username: "lee", name: "Lee Robinson", avatar: "https://github.com/leerob.png" },
    { username: "steven", name: "Steven", avatar: "https://github.com/steven.png" },
    { username: "michael", name: "Michael", avatar: "https://github.com/michael.png" },
  ],
  relatedProjects: [
    {
      name: "remix",
      description: "Full stack web framework",
      stars: 24150,
      language: "TypeScript"
    },
    {
      name: "gatsby",
      description: "Build blazing fast websites",
      stars: 54321,
      language: "TypeScript"
    },
    {
      name: "astro",
      description: "The all-in-one web framework",
      stars: 34567,
      language: "TypeScript"
    }
  ],
  readme: `# Next.js

  The React Framework for Production...
  
  ## Getting Started
  Visit [https://nextjs.org/docs](https://nextjs.org/docs) to get started with Next.js.
  
  ## Documentation
  Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.`,
  techStack: ["React", "TypeScript", "Node.js", "Webpack"],
  license: "MIT",
  contributorsCount: 2943
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
                      <span className="text-sm">{repository.contributors.length}</span>
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

            {/* Contributors Section */}
            <Card className="mb-8">
              <CardHeader className="pb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Contributors
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {repository.contributors.map((contributor) => (
                    <div key={contributor.username} className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">@{contributor.username}</p>
                      </div>
                    </div>
                  ))}
                  {repository.contributorsCount > repository.contributors.length && (
                    <Button variant="ghost" className="text-sm text-muted-foreground">
                      View all {repository.contributorsCount} contributors
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Projects Section */}
            <Card className="mb-8">
              <CardHeader className="pb-2">
                <h3 className="font-semibold">Related Projects</h3>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {repository.relatedProjects.map((project) => (
                    <div key={project.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span className="text-sm">{project.stars}</span>
                        </div>
                        <Badge variant="secondary">{project.language}</Badge>
                      </div>
                    </div>
                  ))}
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
