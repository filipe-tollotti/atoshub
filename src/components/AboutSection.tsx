import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Scale, TrendingUp, Eye } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: "Propósito",
      description: "Democratizar o acesso a soluções financeiras estruturadas com transparência e responsabilidade.",
    },
    {
      icon: Scale,
      title: "Governança",
      description: "Práticas rigorosas de compliance, ética e gestão responsável de recursos.",
    },
    {
      icon: TrendingUp,
      title: "Inovação",
      description: "Tecnologia de ponta para oferecer experiências financeiras mais eficientes.",
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Construímos relacionamentos duradouros baseados em confiança mútua.",
    },
  ];

  return (
    <section id="quem-somos" className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-atos-gold/20 text-atos-gold-dark text-sm font-medium mb-6">
                Quem Somos
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                Um hub financeiro e tecnológico orientado por{" "}
                <span className="text-atos-gold-dark">confiança</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A Atos Hub é uma plataforma financeira multibancos que une tecnologia 
                avançada e atendimento humanizado para estruturar e distribuir crédito 
                de forma responsável. Atuamos como ponte entre instituições financeiras 
                e clientes que buscam soluções confiáveis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nosso modelo está preparado para o futuro: Banco Digital, Banking as a Service (BaaS) 
                e parcerias estratégicas que ampliam seu acesso ao crédito estruturado.
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="card-elevated p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-atos-blue/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-atos-blue" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
