import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, FileCheck, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Parcerias Reguladas",
    description: "Trabalhamos apenas com instituições financeiras autorizadas pelo Banco Central.",
  },
  {
    icon: Lock,
    title: "Segurança de Dados",
    description: "Infraestrutura robusta com criptografia de ponta e conformidade com LGPD.",
  },
  {
    icon: FileCheck,
    title: "Compliance Rigoroso",
    description: "Processos internos alinhados às melhores práticas de governança corporativa.",
  },
  {
    icon: BadgeCheck,
    title: "APIs Certificadas",
    description: "Integrações seguras e auditadas para garantir a integridade das operações.",
  },
];

export const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-atos-blue-deep text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <defs>
              <pattern id="trust-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trust-grid)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-atos-gold text-sm font-medium mb-6">
              Tecnologia & Segurança
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Sua segurança é nossa <span className="text-atos-gold">prioridade</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Investimos em tecnologia e processos para garantir que suas operações 
              financeiras sejam seguras, transparentes e em conformidade com todas as regulamentações.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-atos-gold/20 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-atos-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
