
import {
  Code2,
  Server,
  Database,
  Globe,
  Laptop,
  Cpu,
  Cloud,
  Box,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const techStacks = [
  { name: "React", count: 2451, icon: Code2 },
  { name: "Node.js", count: 1832, icon: Server },
  { name: "Python", count: 1654, icon: Box },
  { name: "TypeScript", count: 1243, icon: Code2 },
  { name: "PostgreSQL", count: 1121, icon: Database },
  { name: "MongoDB", count: 987, icon: Database },
  { name: "Vue.js", count: 876, icon: Globe },
  { name: "Angular", count: 765, icon: Code2 },
  { name: "Docker", count: 743, icon: Cloud },
  { name: "Kubernetes", count: 654, icon: Layers },
  { name: "Go", count: 543, icon: Globe },
  { name: "Ruby", count: 432, icon: Cpu },
  { name: "Java", count: 421, icon: Laptop },
  { name: "PHP", count: 387, icon: Globe },
  { name: "Rust", count: 321, icon: Code2 },
];

export default function TechStacks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tech Stacks</h1>
        <p className="text-muted-foreground">
          Browse and manage technology stacks used in repositories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techStacks.map((tech) => {
          const Icon = tech.icon;
          return (
            <Button
              key={tech.name}
              variant="outline"
              className="h-auto p-4 justify-between hover:bg-accent"
              asChild
            >
              <a href="#" className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 flex-1">
                  <Icon className="w-5 h-5" />
                  <span>{tech.name}</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {tech.count} {tech.count === 1 ? 'repo' : 'repos'}
                </span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
