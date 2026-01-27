import { motion } from "framer-motion";
import { ArrowRight, Shield, Cpu, Users, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-atos-gold/10 blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-atos-gold/5 blur-3xl animate-pulse-soft" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-atos-gold text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
              Plataforma Financeira Multibancos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
          >
            Crédito inteligente, tecnologia financeira e{" "}
            <span className="text-atos-gold">confiança</span> para impulsionar
            pessoas e negócios
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Plataforma financeira multibancos que estrutura e distribui crédito
            com responsabilidade e eficiência.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                const element = document.querySelector("#solucoes");
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Conheça as soluções
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white text-atos-blue-deep hover:bg-white/90 border border-white/20 font-semibold px-8 py-6 text-lg shadow-lg transition-all"
              onClick={() => {
                const element = document.querySelector("#contato");
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Fale com a Atos Hub
            </Button>
          </motion.div>

          {/* Differentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          >
            {[
              {
                icon: Cpu,
                title: "Tecnologia Integrada",
              },
              {
                icon: Shield,
                title: "Análise Rigorosa",
              },
              {
                icon: Users,
                title: "Atendimento Humanizado",
              },
              {
                icon: Smartphone,
                title: "Banco Digital & BaaS",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-transparent border border-white/20 hover:bg-white/5 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-atos-gold/20 flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-atos-gold" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
