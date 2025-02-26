
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Settings, 
  Users, 
  Database, 
  List,
  ChevronLast,
  ChevronFirst,
  Home,
  Loader2
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/hooks/useAdmin";

export function AdminLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  console.log('Auth State:', { isSignedIn, isLoaded, userId });
  console.log('Admin State:', { isAdmin, loading });

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    console.log('User not signed in, redirecting to home');
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    console.log('User not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Convert pathname to breadcrumbs
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + pathSegments.slice(0, index + 1).join('/')
  }));

  return (
    <div className="min-h-screen flex dark:bg-[#1F1F1F]">
      {/* Sidebar */}
      <aside className={cn(
        "h-screen flex flex-col border-r bg-card transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}>
        {/* Logo section */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={cn(
            "flex items-center gap-2 transition-all duration-300",
            expanded ? "w-full" : "w-0 opacity-0"
          )}>
            <Home className="shrink-0" />
            <span className="font-semibold">Lovable Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(prev => !prev)}
            className="shrink-0"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {expanded ? (
            <>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/admin/repositories">
                  <Database className="mr-2 shrink-0" />
                  Repositories
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/admin/categories">
                  <List className="mr-2 shrink-0" />
                  Categories
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/admin/tech-stacks">
                  <Settings className="mr-2 shrink-0" />
                  Tech Stacks
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/admin/users">
                  <Users className="mr-2 shrink-0" />
                  Users
                </a>
              </Button>
            </>
          ) : (
            <>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="w-full">
                    <a href="/admin/repositories">
                      <Database className="shrink-0" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-normal">
                  Repositories
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="w-full">
                    <a href="/admin/categories">
                      <List className="shrink-0" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-normal">
                  Categories
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="w-full">
                    <a href="/admin/tech-stacks">
                      <Settings className="shrink-0" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-normal">
                  Tech Stacks
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="w-full">
                    <a href="/admin/users">
                      <Users className="shrink-0" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-normal">
                  Users
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </nav>

        {/* User section */}
        <div className={cn(
          "border-t p-4",
          expanded ? "flex items-center gap-4" : "flex justify-center"
        )}>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
          {expanded && <span className="text-sm">Admin Account</span>}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className="border-b">
          <div className="flex items-center gap-2 px-6 h-14">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
                <a 
                  href={crumb.href}
                  className={cn(
                    "text-sm hover:text-primary transition-colors",
                    index === breadcrumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {crumb.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
