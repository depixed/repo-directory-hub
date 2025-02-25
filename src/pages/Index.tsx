
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { TrendingSection } from "@/components/home/TrendingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <TrendingSection />
      </main>
    </div>
  );
};

export default Index;
