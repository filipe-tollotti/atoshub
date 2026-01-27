import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Layers, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const partnerTypes = [
  {
    icon: Building,
    title: "Bancos e Financeiras",
    description: "Conecte sua instituição a uma rede qualificada de clientes e amplie sua distribuição de crédito.",
  },
  {
    icon: Layers,
    title: "Empresas e Incorporadoras",
    description: "Soluções de crédito estruturado para viabilizar projetos e crescimento sustentável.",
  },
  {
    icon: Code,
    title: "Integradores e Fintechs",
    description: "APIs e infraestrutura BaaS para integrar serviços financeiros ao seu ecossistema.",
  },
];

export const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="parceiros" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-atos-blue/10 text-atos-blue text-sm font-medium mb-6">
                Para Parceiros
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                Cresça conosco como{" "}
                <span className="text-atos-gold-dark">parceiro estratégico</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A Atos Hub oferece oportunidades para bancos, empresas e integradores 
                que buscam expandir sua atuação no mercado de crédito estruturado com 
                tecnologia e governança.
              </p>
              <a href="#contato">
                <Button
                  size="lg"
                  className="bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-semibold"
                >
                  Seja um Parceiro
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {partnerTypes.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="card-elevated p-6 flex gap-5 items-start hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                    <partner.icon className="h-7 w-7 text-atos-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{partner.title}</h3>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
