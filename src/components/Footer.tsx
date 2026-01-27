import { Linkedin, Instagram, Mail } from "lucide-react";

const footerLinks = {
  institucional: [
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Impacto & Responsabilidade", href: "#impacto" },
  ],
  solucoes: [
    { label: "B2C", href: "#solucoes" },
    { label: "B2B", href: "#solucoes" },
    { label: "Parceiros", href: "#parceiros" },
  ]
};

export const Footer = () => {
  return (
    <footer className="bg-atos-blue-deep text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-serif font-semibold text-xl text-white">
                  Atos <span className="text-atos-gold">Hub</span>
                </span>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Plataforma financeira multibancos que estrutura e distribui crédito 
                com responsabilidade e eficiência.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-atos-gold hover:text-atos-blue-deep transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-atos-gold hover:text-atos-blue-deep transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:contato@atoshub.com.br" 
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-atos-gold hover:text-atos-blue-deep transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Institucional */}
            <div>
              <h4 className="font-semibold text-white mb-4">Institucional</h4>
              <ul className="space-y-3">
                {footerLinks.institucional.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
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
                      className="text-white/60 hover:text-atos-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções */}
            <div>
              <h4 className="font-semibold text-white mb-4">Soluções</h4>
              <ul className="space-y-3">
                {footerLinks.solucoes.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
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
                      className="text-white/60 hover:text-atos-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          
          </div>
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} Atos Hub. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
