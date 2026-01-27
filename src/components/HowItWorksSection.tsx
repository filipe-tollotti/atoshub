import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, FileCheck, Banknote, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Análise",
    description: "Avaliamos seu perfil e necessidades com critérios rigorosos e transparentes.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Estruturação",
    description: "Montamos a melhor solução financeira conectando você aos parceiros ideais.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Distribuição",
    description: "Viabilizamos o acesso ao crédito com condições competitivas e justas.",
  },
  {
    icon: HeadphonesIcon,
    step: "04",
    title: "Acompanhamento",
    description: "Oferecemos suporte contínuo durante toda a jornada do seu crédito.",
  },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-atos-gold/20 text-atos-gold-dark text-sm font-medium mb-6">
              Como Funciona
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Um processo <span className="text-atos-gold-dark">simples e transparente</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Da análise ao acompanhamento, cuidamos de cada etapa para que você tenha 
              a melhor experiência financeira.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="card-elevated p-8 text-center relative z-10 h-full">
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-atos-blue flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-atos-gold text-atos-blue-deep font-bold text-sm flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
