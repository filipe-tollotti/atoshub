import { Building2 } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { BusinessSimulator } from "@/components/simulators/BusinessSimulator";

const features = [
  {
    title: "Análise Sob Medida",
    description: "Estudo aprofundado das necessidades e capacidade financeira da sua empresa para estruturar a melhor operação."
  },
  {
    title: "Múltiplas Fontes de Captação",
    description: "Acesso a bancos, fundos de investimento, FIDCs e outras fontes para compor a estrutura ideal."
  },
  {
    title: "Estruturação Complexa",
    description: "Modelagem de operações com garantias, covenants e condições customizadas para cada caso."
  },
  {
    title: "Due Diligence Completa",
    description: "Análise detalhada de documentos, balanços e projeções para maximizar chances de aprovação."
  },
  {
    title: "Negociação com Credores",
    description: "Representação da sua empresa nas negociações para obter as melhores condições."
  },
  {
    title: "Gestão Pós-Operação",
    description: "Acompanhamento contínuo do cumprimento de obrigações e relacionamento com credores."
  }
];

const benefits = [
  "Operações a partir de R$ 1 milhão",
  "Taxas competitivas negociadas caso a caso",
  "Prazos de até 10 anos",
  "Estruturas com múltiplos credores",
  "Acesso a linhas de fomento (BNDES, Finep)",
  "Garantias customizadas (recebíveis, imóveis, fiança)",
  "Expertise em diversos setores da economia"
];

const interestOptions = [
  "Capital de giro corporativo",
  "Financiamento de aquisição",
  "Reestruturação de dívidas",
  "Acesso a BNDES/Finep",
  "Project finance",
  "Outros"
];

export default function CreditoEstruturado() {
  return (
    <SolutionPageLayout
      icon={Building2}
      title="Crédito Estruturado"
      subtitle="Para Empresas"
      description="Modelagem e estruturação de operações de crédito personalizadas para atender às necessidades específicas da sua empresa."
      features={features}
      benefits={benefits}
      simulator={<BusinessSimulator type="corporate" />}
      solutionType="b2b"
      contactInterestOptions={interestOptions}
      ctaText="Falar com especialista"
    />
  );
}
