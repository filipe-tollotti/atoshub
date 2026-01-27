import { Server } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

const features = [
  {
    title: "APIs Robustas",
    description: "Integração simplificada com APIs REST bem documentadas para todos os serviços bancários."
  },
  {
    title: "White Label",
    description: "Serviços financeiros com a sua marca, oferecendo experiência seamless para seus clientes."
  },
  {
    title: "Compliance Integrado",
    description: "KYC, PLD/FT e demais obrigações regulatórias já embarcadas na plataforma."
  },
  {
    title: "Conta Digital",
    description: "Ofereça contas digitais completas para seus clientes com toda a infraestrutura pronta."
  },
  {
    title: "Emissão de Boletos e PIX",
    description: "Geração e conciliação automatizada de boletos e PIX para seu negócio."
  },
  {
    title: "Crédito Embedded",
    description: "Ofereça crédito integrado à jornada do seu cliente com nossa infraestrutura."
  }
];

const benefits = [
  "Time-to-market acelerado",
  "Regulação e compliance inclusos",
  "Escalabilidade automática",
  "Suporte técnico especializado",
  "SLA de 99.9% de disponibilidade",
  "Parceria com instituições reguladas pelo Banco Central",
  "Modelo de negócio flexível (revenue share ou fee fixo)"
];

const interestOptions = [
  "Conta digital white label",
  "Integração de pagamentos (PIX/Boleto)",
  "Crédito embedded",
  "KYC e compliance",
  "Parceria estratégica",
  "Demonstração da plataforma",
  "Outros"
];

export default function BankingAsService() {
  return (
    <SolutionPageLayout
      icon={Server}
      title="Banking as a Service"
      subtitle="Para Empresas"
      description="Infraestrutura financeira completa via BaaS para integrar serviços bancários ao seu negócio e criar novas fontes de receita."
      features={features}
      benefits={benefits}
      solutionType="b2b"
      contactInterestOptions={interestOptions}
      ctaText="Agendar demonstração"
    />
  );
}
