import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-atos-gold/10 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-atos-blue/5 blur-3xl animate-pulse-soft" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-9xl md:text-[12rem] font-serif font-bold bg-gradient-to-br from-atos-blue-deep via-atos-blue to-atos-gold bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-atos-gold/20 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-atos-gold-dark" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4"
            >
              Página não encontrada
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              Desculpe, a página que você está procurando não existe ou foi movida. 
              Verifique o endereço ou retorne à página inicial.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Voltar para Home
                </Button>
              </Link>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.history.back()}
                className="border-atos-blue text-atos-blue hover:bg-atos-blue/10 font-semibold px-8 py-6 text-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Ou visite:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/#solucoes"
                  className="text-atos-blue hover:text-atos-gold-dark transition-colors font-medium"
                >
                  Soluções
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/blog"
                  className="text-atos-blue hover:text-atos-gold-dark transition-colors font-medium"
                >
                  Blog
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/#contato"
                  className="text-atos-blue hover:text-atos-gold-dark transition-colors font-medium"
                >
                  Contato
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
