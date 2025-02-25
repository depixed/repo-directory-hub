
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Github,
  Search,
  Menu,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
              <SheetContent side="left">
                <nav className="flex flex-col gap-4">
                  <a href="#trending" className="text-lg font-medium">Trending</a>
                  <a href="#categories" className="text-lg font-medium">Categories</a>
                  <a href="#tech-stacks" className="text-lg font-medium">Tech Stacks</a>
                </nav>
              </SheetContent>
            </Sheet>
            
            <a href="/" className="text-xl font-bold">
              opensource.so
            </a>
            
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#trending" className="text-sm font-medium hover:text-primary/80">
                Trending
              </a>
              <a href="#categories" className="text-sm font-medium hover:text-primary/80">
                Categories
              </a>
              <a href="#tech-stacks" className="text-sm font-medium hover:text-primary/80">
                Tech Stacks
              </a>
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

            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
