import { Header } from "@/components/Header";
import { PartnersSection } from "@/components/PartnersSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Partners = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <PartnersSection />
        <ContactSection initialType="parceiro" />
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
