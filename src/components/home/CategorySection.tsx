
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  { name: "Backend", count: 1240 },
  { name: "Frontend", count: 982 },
  { name: "DevOps", count: 756 },
  { name: "Mobile", count: 543 },
  { name: "AI/ML", count: 421 },
  { name: "Security", count: 312 }
];

export function CategorySection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.name}
              className="fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} repos</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
