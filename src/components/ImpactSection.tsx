import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Sprout, GraduationCap } from "lucide-react";

export const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const impacts = [
    {
      icon: Heart,
      title: "Inclusão Financeira Consciente",
      description: "Democratizamos o acesso ao crédito com responsabilidade, levando soluções financeiras a quem mais precisa.",
    },
    {
      icon: Sprout,
      title: "Crescimento Sustentável",
      description: "Promovemos o desenvolvimento econômico respeitando práticas éticas e sustentáveis.",
    },
    {
      icon: GraduationCap,
      title: "Educação Financeira",
      description: "Capacitamos nossos clientes com conhecimento para tomar decisões financeiras mais conscientes.",
    },
  ];

  return (
    <section className="section-padding bg-secondary">
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
              Impacto & Responsabilidade
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Construindo um futuro{" "}
              <span className="text-atos-gold-dark">mais justo</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Acreditamos que o crédito responsável é uma ferramenta de transformação social. 
              Nossa missão vai além dos números.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card-elevated p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-atos-blue/10 flex items-center justify-center mx-auto mb-6">
                  <impact.icon className="h-8 w-8 text-atos-blue" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
