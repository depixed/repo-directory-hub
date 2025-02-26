
import { useState } from "react";
import { RepoCard } from "./RepoCard";
import { ViewToggle } from "./ViewToggle";

const TRENDING_REPOS = [
  {
    name: "next.js",
    description: "The React Framework for Production",
    stars: 98245,
    forks: 24150,
    language: "TypeScript"
  },
  {
    name: "supabase",
    description: "The open source Firebase alternative",
    stars: 54321,
    forks: 3421,
    language: "TypeScript"
  },
  {
    name: "shadcn-ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    stars: 32145,
    forks: 1543,
    language: "TypeScript"
  }
];

export function TrendingSection() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-3xl font-bold">Trending Repositories</h2>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
        <div className={`grid gap-6 ${
          view === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {TRENDING_REPOS.map((repo, index) => (
            <div
              key={repo.name}
              className="fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <RepoCard {...repo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
