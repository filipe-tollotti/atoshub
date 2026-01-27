import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SolutionContactForm } from "./SolutionContactForm";

interface SolutionPageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  benefits: string[];
  simulator?: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
  solutionType?: "b2c" | "b2b";
  contactInterestOptions?: string[];
}

export const SolutionPageLayout = ({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  benefits,
  simulator,
  ctaText = "Fale com um especialista",
  solutionType = "b2c",
  contactInterestOptions = [],
}: SolutionPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-atos-blue via-atos-blue-deep to-atos-blue-institutional py-20">
          <div className="container mx-auto px-4">
            <Link 
              to="/#solucoes" 
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Soluções
            </Link>
            
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Icon className="h-8 w-8 text-atos-gold" />
                </div>
                <span className="text-atos-gold font-medium">{subtitle}</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
              >
                {title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/80 max-w-2xl"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center"
              >
                Como funciona
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-atos-gold/20 flex items-center justify-center mb-4">
                      <span className="text-atos-gold-dark font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Simulator + Benefits Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Simulator */}
                {simulator && (
                  <div>
                    {simulator}
                  </div>
                )}
                
                {/* Benefits */}
                <div className={simulator ? "" : "lg:col-span-2"}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Por que escolher a Atos Hub?
                    </h2>
                    
                    <ul className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-6 w-6 text-atos-gold-dark flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Link to="/#contato">
                        <Button size="lg" className="bg-atos-blue hover:bg-atos-blue-deep text-white">
                          {ctaText}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contato-solucao" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                    Pronto para começar?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Nossa equipe está pronta para entender suas necessidades e apresentar 
                    a melhor solução de <strong>{title}</strong> para você.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-atos-gold-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Análise Personalizada</h4>
                        <p className="text-sm text-muted-foreground">Entendemos sua situação e oferecemos a melhor proposta.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-atos-gold-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Resposta Rápida</h4>
                        <p className="text-sm text-muted-foreground">Retorno em até 24 horas úteis.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-atos-gold-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Sem Compromisso</h4>
                        <p className="text-sm text-muted-foreground">Consulta inicial gratuita e sem burocracia.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <SolutionContactForm
                  solutionName={title}
                  solutionType={solutionType}
                  interestOptions={contactInterestOptions}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
