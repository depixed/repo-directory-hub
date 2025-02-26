
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Users, Database, List } from "lucide-react";

export function AdminLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <nav className="px-4 pb-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/repositories">
              <Database className="mr-2" />
              Repositories
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/categories">
              <List className="mr-2" />
              Categories
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/tech-stacks">
              <Settings className="mr-2" />
              Tech Stacks
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/users">
              <Users className="mr-2" />
              Users
            </a>
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
