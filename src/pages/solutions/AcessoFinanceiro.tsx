import { CreditCard } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

const features = [
  {
    title: "Abertura Simplificada",
    description: "Processo 100% digital para abrir sua conta em poucos minutos, sem burocracia e sem taxas escondidas."
  },
  {
    title: "Cartão de Débito",
    description: "Cartão físico e virtual para suas compras do dia a dia, com função contactless e controle total pelo app."
  },
  {
    title: "Transferências Facilitadas",
    description: "PIX, TED e DOC sem complicação. Envie e receba dinheiro de forma rápida e segura."
  },
  {
    title: "Gestão Financeira",
    description: "Acompanhe seus gastos, defina limites e receba insights para melhorar sua saúde financeira."
  },
  {
    title: "Pagamento de Contas",
    description: "Pague boletos, contas de consumo e tributos diretamente pela sua conta digital."
  },
  {
    title: "Suporte Humanizado",
    description: "Atendimento real, com pessoas de verdade prontas para ajudar quando você precisar."
  }
];

const benefits = [
  "Conta digital sem taxas de manutenção",
  "Sem consulta ao SPC/Serasa para abertura",
  "Aplicativo intuitivo e fácil de usar",
  "Segurança com autenticação biométrica",
  "Suporte por WhatsApp e telefone",
  "Educação financeira integrada",
  "Cashback em parceiros selecionados"
];

const interestOptions = [
  "Abrir conta digital",
  "Solicitar cartão de débito",
  "Informações sobre taxas",
  "Dúvidas sobre transferências",
  "Outros"
];

export default function AcessoFinanceiro() {
  return (
    <SolutionPageLayout
      icon={CreditCard}
      title="Acesso Financeiro"
      subtitle="Para Você"
      description="Conta digital completa e acessível, projetada para simplificar sua vida financeira com transparência e sem taxas abusivas."
      features={features}
      benefits={benefits}
      solutionType="b2c"
      contactInterestOptions={interestOptions}
      ctaText="Abrir minha conta"
    />
  );
}
