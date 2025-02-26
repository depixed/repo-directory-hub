
import { Card, CardContent } from "@/components/ui/card";

const TECH_STACKS = [
  { name: "React", count: 2451 },
  { name: "Node.js", count: 1832 },
  { name: "Python", count: 1654 },
  { name: "TypeScript", count: 1243 },
  { name: "Go", count: 987 },
  { name: "Rust", count: 765 }
];

export function TechStackSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>Popular Tech Stacks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH_STACKS.map((stack, index) => (
            <div
              key={stack.name}
              className="fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium mb-1">{stack.name}</h3>
                  <p className="text-sm text-muted-foreground">{stack.count} repos</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
