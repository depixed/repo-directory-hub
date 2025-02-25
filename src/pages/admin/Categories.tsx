
import {
  BrainCog,
  KeyRound,
  Database,
  Building2,
  LayoutGrid,
  ShoppingCart,
  Users,
  BarChart,
  MessageSquare,
  Settings,
  Mail,
  FileText,
  Server,
  Code,
  GitBranch,
  BookOpen,
  MonitorSmartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "API Platform", count: 15, icon: Server },
  { name: "Artificial Intelligence", count: 25, icon: BrainCog },
  { name: "Auth & SSO", count: 9, icon: KeyRound },
  { name: "Backend as a Service", count: 16, icon: Database },
  { name: "Business Intelligence", count: 8, icon: BarChart },
  { name: "Cloud Storage", count: 1, icon: Server },
  { name: "CMS", count: 22, icon: LayoutGrid },
  { name: "Commerce", count: 9, icon: ShoppingCart },
  { name: "Communication", count: 25, icon: MessageSquare },
  { name: "Communities", count: 9, icon: Users },
  { name: "Control Panel", count: 5, icon: Settings },
  { name: "CRM", count: 7, icon: Building2 },
  { name: "Data Integration", count: 5, icon: GitBranch },
  { name: "Document Management", count: 1, icon: FileText },
  { name: "Email", count: 11, icon: Mail },
  { name: "IDEs & Environment", count: 5, icon: Code },
  { name: "Learning Management", count: 4, icon: BookOpen },
  { name: "Mobile Apps", count: 2, icon: MonitorSmartphone },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Browse and manage categories for open source software
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              variant="outline"
              className="h-auto p-4 justify-between hover:bg-accent"
              asChild
            >
              <a href="#" className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 flex-1">
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {category.count} {category.count === 1 ? 'tool' : 'tools'}
                </span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
