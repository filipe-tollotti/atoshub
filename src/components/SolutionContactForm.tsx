import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useToast } from "@/hooks/use-toast";

interface SolutionContactFormProps {
  solutionName: string;
  solutionType: "b2c" | "b2b";
  interestOptions?: string[];
}

export const SolutionContactForm = ({ 
  solutionName, 
  solutionType,
  interestOptions = []
}: SolutionContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [interest, setInterest] = useState(interestOptions[0] || "");
  const [message, setMessage] = useState("");

  // B2B uses CNPJ, B2C uses CPF
  const initialFields = solutionType === "b2b" 
    ? { name: "", email: "", phone: "", company: "", cnpj: "" }
    : { name: "", email: "", phone: "", cpf: "" };

  const { fields, getFieldProps, validateAll, resetForm } = useFormValidation(initialFields);

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
        solutionName,
        solutionType,
        interest: interest || interestOptions[0] || '',
        message,
        ...fieldValues,
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
    setInterest(interestOptions[0] || "");
    setMessage("");
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 border border-border text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
          Obrigado pelo interesse!
        </h3>
        <p className="text-muted-foreground mb-6">
          Recebemos sua solicitação sobre <strong>{solutionName}</strong>. 
          Nossa equipe especializada entrará em contato em até 24 horas úteis.
        </p>
        <Button variant="outline" onClick={handleReset}>
          Enviar nova mensagem
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-8 border border-border"
    >
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-atos-gold/20 text-atos-gold-dark text-sm font-medium mb-3">
          {solutionName}
        </span>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
          Fale com um especialista
        </h3>
        <p className="text-muted-foreground">
          Preencha o formulário e receba uma proposta personalizada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
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

        <div className="grid sm:grid-cols-2 gap-4">
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
          {solutionType === "b2c" && (
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
          {solutionType === "b2b" && (
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

        {solutionType === "b2b" && (
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

        {interestOptions.length > 0 && (
          <div className="space-y-1.5">
            <Label htmlFor="interest" className="text-sm font-medium">
              {solutionType === "b2b" ? "Tipo de operação" : "Interesse principal"}
            </Label>
            <Select value={interest} onValueChange={setInterest}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {interestOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium">
            Mensagem
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Conte-nos mais sobre sua necessidade com ${solutionName}...`}
            rows={4}
            className="mt-1 resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-atos-blue hover:bg-atos-blue-deep text-white py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Solicitar Contato
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Ao enviar, você concorda com nossa política de privacidade. 
          Seus dados estão protegidos.
        </p>
      </form>
    </motion.div>
  );
};
