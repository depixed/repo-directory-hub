
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Github,
  Search,
  Menu,
  X,
  LayoutGrid,
  Layers,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background">
                <nav className="flex flex-col gap-4">
                  <a href="#trending" className="text-lg font-medium">Trending</a>
                  <Link to="/categories" className="text-lg font-medium flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Categories
                  </Link>
                  <Link to="/tech-stacks" className="text-lg font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Tech Stacks
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="text-xl font-bold">
              opensource.so
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#trending" className="text-sm font-medium hover:text-primary/80">
                Trending
              </a>
              <Link 
                to="/categories" 
                className="text-sm font-medium hover:text-primary/80 flex items-center gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Categories
              </Link>
              <Link 
                to="/tech-stacks" 
                className="text-sm font-medium hover:text-primary/80 flex items-center gap-2"
              >
                <Layers className="h-4 w-4" />
                Tech Stacks
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className={`${isSearchOpen ? 'flex' : 'hidden'} lg:flex items-center gap-2`}>
              <Input
                type="search"
                placeholder="Search repositories..."
                className="w-[200px] lg:w-[300px]"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </div>
            )}

            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
