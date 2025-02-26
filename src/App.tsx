
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import RepositoryDetails from "./pages/RepositoryDetails";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import Repositories from "./pages/admin/Repositories";
import Categories from "./pages/admin/Categories";
import TechStacks from "./pages/admin/TechStacks";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/tech-stacks" element={<TechStacks />} />
              <Route 
                path="/repository/:id" 
                element={
                  <ProtectedRoute>
                    <RepositoryDetails />
                  </ProtectedRoute>
                } 
              />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="repositories" element={<Repositories />} />
                <Route path="categories" element={<Categories />} />
                <Route path="tech-stacks" element={<TechStacks />} />
                <Route path="users" element={<div>Users - Coming soon</div>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
