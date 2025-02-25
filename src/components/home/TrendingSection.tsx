
import { RepoCard } from "./RepoCard";

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
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Trending Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_REPOS.map((repo) => (
            <RepoCard key={repo.name} {...repo} />
          ))}
        </div>
      </div>
    </section>
  );
}
