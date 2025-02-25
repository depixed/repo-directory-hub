
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl fade-in">
            Discover Amazing Open Source Projects
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground fade-in">
            Explore a curated collection of the best open source projects. Find tools, libraries, and resources for your next project.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 fade-in">
            <Button size="lg">Browse Projects</Button>
            <Button variant="outline" size="lg">Submit Project</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
