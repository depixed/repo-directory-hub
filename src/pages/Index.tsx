
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { TrendingSection } from "@/components/home/TrendingSection";
import { CategorySection } from "@/components/home/CategorySection";
import { TechStackSection } from "@/components/home/TechStackSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <TrendingSection />
        <CategorySection />
        <TechStackSection />
      </main>
    </div>
  );
};

export default Index;
