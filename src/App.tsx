
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RepositoryDetails from "./pages/RepositoryDetails";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import Repositories from "./pages/admin/Repositories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/repository/:id" 
            element={
              <ProtectedRoute>
                <RepositoryDetails />
              </ProtectedRoute>
            } 
          />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="repositories" element={<Repositories />} />
            <Route path="categories" element={<div>Categories - Coming soon</div>} />
            <Route path="tech-stacks" element={<div>Tech Stacks - Coming soon</div>} />
            <Route path="users" element={<div>Users - Coming soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
