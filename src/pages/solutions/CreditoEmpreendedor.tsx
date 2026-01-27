import { Briefcase } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { BusinessSimulator } from "@/components/simulators/BusinessSimulator";

const features = [
  {
    title: "Capital de Giro",
    description: "Recursos para manter seu fluxo de caixa saudável e honrar compromissos do dia a dia."
  },
  {
    title: "Crédito para Equipamentos",
    description: "Financiamento para compra de máquinas, equipamentos e ferramentas para seu negócio."
  },
  {
    title: "Análise Simplificada",
    description: "Processo menos burocrático, com análise baseada no potencial do seu negócio."
  },
  {
    title: "Consultoria Financeira",
    description: "Orientação para usar o crédito de forma inteligente e fazer seu negócio crescer."
  },
  {
    title: "Antecipação de Recebíveis",
    description: "Transforme suas vendas a prazo em dinheiro disponível imediatamente."
  },
  {
    title: "Linhas Específicas",
    description: "Acesso a programas como BNDES, Pronampe e outras linhas com condições especiais."
  }
];

const benefits = [
  "Taxas competitivas a partir de 2.49% a.m.",
  "Crédito de R$ 5 mil a R$ 500 mil",
  "Prazos flexíveis de até 48 meses",
  "Carência para início do pagamento",
  "Sem necessidade de garantia real para valores menores",
  "Liberação rápida após aprovação",
  "Suporte para MEI, ME e EPP"
];

const interestOptions = [
  "Capital de giro",
  "Compra de equipamentos",
  "Expansão do negócio",
  "Antecipação de recebíveis",
  "Linhas de fomento (BNDES/Pronampe)",
  "Outros"
];

export default function CreditoEmpreendedor() {
  return (
    <SolutionPageLayout
      icon={Briefcase}
      title="Crédito ao Empreendedor"
      subtitle="Para Você"
      description="Impulsione seu pequeno negócio com crédito responsável, taxas justas e orientação para crescer de forma sustentável."
      features={features}
      benefits={benefits}
      simulator={<BusinessSimulator type="entrepreneur" />}
      solutionType="b2c"
      contactInterestOptions={interestOptions}
      ctaText="Solicitar crédito"
    />
  );
}
