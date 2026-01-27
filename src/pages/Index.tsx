import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TrustSection } from "@/components/TrustSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ImpactSection } from "@/components/ImpactSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <HowItWorksSection />
        <TrustSection />
        <PartnersSection />
        <ImpactSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
