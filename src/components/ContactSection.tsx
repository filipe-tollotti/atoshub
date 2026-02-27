import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField } from "@/components/ui/form-field";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = ({
  initialType = "pessoa-fisica",
}: {
  initialType?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contactType, setContactType] = useState(initialType);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const isCompany = contactType === "empresa";
  const isPartner = contactType === "parceiro";

  // Different fields based on contact type
  const getInitialFields = () => {
    if (isCompany || isPartner) {
      return { name: "", email: "", phone: "", company: "", cnpj: "" };
    }
    return { name: "", email: "", phone: "", cpf: "" };
  };

  const { fields, getFieldProps, validateAll, resetForm } =
    useFormValidation(getInitialFields());

  // Update contactType if initialType changes
  useEffect(() => {
    setContactType(initialType);
  }, [initialType]);

  // Reset form when contact type changes
  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados.",
      });
      return;
    }

    setIsSubmitting(true);

    // Formspree endpoint
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xlgjpaep';
    
    try {
      // Extract only values from fields object
      const fieldValues: Record<string, string> = {};
      Object.keys(fields).forEach((key) => {
        fieldValues[key] = fields[key]?.value || '';
      });

      const formData = {
        ...fieldValues,
        message,
        contactType,
        subject: `Novo contato via Site - ${contactType}`,
        _subject: `Novo contato via Site - ${contactType}`,
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Mensagem enviada!",
          description: "Nossa equipe entrará em contato em breve.",
        });
      } else {
        // Log error details for debugging
        console.error('Formspree error:', responseData);
        throw new Error(responseData.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    resetForm();
    setMessage("");
  };

  return (
    <section id="contato" className="section-padding bg-background">
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
              Contato
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Fale com a <span className="text-atos-gold-dark">Atos Hub</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos prontos para atender você. Entre em contato e descubra
              como podemos ajudar a realizar seus objetivos financeiros.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="card-elevated p-8">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-atos-gold-dark" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">E-mail</p>
                      <a
                        href="mailto:atendimento@atoshub.com.br"
                        className="text-muted-foreground hover:text-atos-gold-dark transition-colors"
                      >
                        atendimento@atoshub.com.br
                      </a>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-atos-gold/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-atos-gold-dark" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Telefone</p>
                      <a
                        href="tel:+551140000000"
                        className="text-muted-foreground hover:text-atos-gold-dark transition-colors"
                      >
                        (11) 4000-0000
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="card-elevated p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                      Mensagem enviada!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Nossa equipe entrará em contato em breve.
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      Enviar nova mensagem
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
                      Envie sua mensagem
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label className="text-foreground mb-3 block">
                          Tipo de contato
                        </Label>
                        <RadioGroup
                          value={contactType}
                          onValueChange={setContactType}
                          className="flex flex-wrap gap-4 sm:gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="pessoa-fisica"
                              id="pessoa-fisica"
                            />
                            <Label
                              htmlFor="pessoa-fisica"
                              className="cursor-pointer"
                            >
                              Pessoa Física
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="empresa" id="empresa" />
                            <Label htmlFor="empresa" className="cursor-pointer">
                              Empresa
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="parceiro" id="parceiro" />
                            <Label
                              htmlFor="parceiro"
                              className="cursor-pointer"
                            >
                              Parceiro
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          id="name"
                          label="Nome completo"
                          placeholder="Seu nome"
                          required
                          value={fields.name?.value || ""}
                          error={fields.name?.error}
                          touched={fields.name?.touched}
                          {...getFieldProps("name")}
                        />
                        <FormField
                          id="email"
                          label="E-mail"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          value={fields.email?.value || ""}
                          error={fields.email?.error}
                          touched={fields.email?.touched}
                          {...getFieldProps("email")}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          id="phone"
                          label="Telefone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          required
                          value={fields.phone?.value || ""}
                          error={fields.phone?.error}
                          touched={fields.phone?.touched}
                          {...getFieldProps("phone")}
                        />
                        {!isCompany && !isPartner && (
                          <FormField
                            id="cpf"
                            label="CPF"
                            placeholder="000.000.000-00"
                            required
                            value={fields.cpf?.value || ""}
                            error={fields.cpf?.error}
                            touched={fields.cpf?.touched}
                            {...getFieldProps("cpf")}
                          />
                        )}
                        {(isCompany || isPartner) && (
                          <FormField
                            id="cnpj"
                            label="CNPJ"
                            placeholder="00.000.000/0000-00"
                            required
                            value={fields.cnpj?.value || ""}
                            error={fields.cnpj?.error}
                            touched={fields.cnpj?.touched}
                            {...getFieldProps("cnpj")}
                          />
                        )}
                      </div>

                      {(isCompany || isPartner) && (
                        <FormField
                          id="company"
                          label="Empresa"
                          placeholder="Nome da empresa"
                          required
                          value={fields.company?.value || ""}
                          error={fields.company?.error}
                          touched={fields.company?.touched}
                          {...getFieldProps("company")}
                        />
                      )}

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-foreground">
                          Mensagem
                        </Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Como podemos ajudar?"
                          className="mt-2 min-h-[120px] bg-background"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Mensagem
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
