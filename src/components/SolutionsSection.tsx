import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  CreditCard, 
  Home, 
  Briefcase, 
  Building2, 
  Handshake, 
  Server,
  User,
  Users2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const b2cSolutions = [
  {
    icon: CreditCard,
    title: "Acesso Financeiro",
    description: "Conta digital e serviços financeiros com clareza e educação financeira.",
    features: ["Conta digital", "Serviços essenciais", "Sem taxas abusivas"],
    href: "/solucoes/acesso-financeiro",
  },
  {
    icon: Briefcase,
    title: "Crédito",
    description: "Soluções completas de crédito para realizar seus objetivos.",
    features: ["Empréstimos", "Garantias", "Consórcios"],
    href: "/solucoes/credito",
  },
  {
    icon: Home,
    title: "Planejamento",
    description: "Financiamento imobiliário e crédito para o pequeno empreendedor.",
    features: ["Financiamento Imobiliário", "Crédito Empreendedor", "Planejamento Financeiro"],
    href: "/solucoes/planejamento",
  },
];

const b2bSolutions = [
  {
    icon: Building2,
    title: "Crédito Estruturado",
    description: "Modelagem e estruturação de operações de crédito personalizadas.",
    features: ["Análise sob medida", "Múltiplas fontes", "Estruturação complexa"],
    href: "/solucoes/credito-estruturado",
  },
  {
    icon: Handshake,
    title: "Modelagem Financeira",
    description: "Soluções de financiamento imobiliário e projetos estratégicos.",
    features: ["Modelagem Financeira", "Financiamento Imobiliário", "Parceria Estratégica"],
    href: "/solucoes/modelagem-financeira",
  },
  {
    icon: Server,
    title: "Infraestrutura Financeira",
    description: "Infraestrutura financeira via BaaS para integrar serviços bancários.",
    features: ["Banking as a Service", "APIs robustas", "White label"],
    href: "/solucoes/infraestrutura-financeira",
  },
];

const SolutionCard = ({ solution, index, isInView, type }: { solution: typeof b2cSolutions[0], index: number, isInView: boolean, type: "b2c" | "b2b" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="card-elevated p-8 group hover:shadow-lg transition-all"
  >
    <div className="w-14 h-14 rounded-xl bg-atos-gold/20 flex items-center justify-center mb-6 group-hover:bg-atos-gold/30 transition-colors">
      <solution.icon className="h-7 w-7 text-atos-gold-dark" />
    </div>
    <h3 className="text-xl font-serif font-semibold text-foreground mb-3">{solution.title}</h3>
    <p className="text-muted-foreground mb-6">{solution.description}</p>
    <ul className="space-y-2">
      {solution.features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-atos-gold" />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

export const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solucoes" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-atos-blue/10 text-atos-blue text-sm font-medium mb-6">
              Nossas Soluções
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Soluções financeiras para cada{" "}
              <span className="text-atos-gold-dark">necessidade</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Oferecemos um portfólio completo de produtos e serviços financeiros, 
              tanto para pessoas físicas quanto para empresas.
            </p>
          </motion.div>

          <Tabs defaultValue="b2c" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-secondary p-1 rounded-xl h-auto">
              <TabsTrigger 
                value="b2c" 
                className="data-[state=active]:bg-atos-blue data-[state=active]:text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2 flex-1 w-full h-auto"
              >
                <User className="h-4 w-4" />
                B2C
              </TabsTrigger>
              <TabsTrigger 
                value="b2b"
                className="data-[state=active]:bg-atos-blue data-[state=active]:text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2 flex-1 w-full h-auto"
              >
                <Users2 className="h-4 w-4" />
                B2B
              </TabsTrigger>
            </TabsList>

            <TabsContent value="b2c">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {b2cSolutions.map((solution, index) => (
                  <SolutionCard key={index} solution={solution} index={index} isInView={isInView} type="b2c" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="b2b">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {b2bSolutions.map((solution, index) => (
                  <SolutionCard key={index} solution={solution} index={index} isInView={isInView} type="b2b" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
