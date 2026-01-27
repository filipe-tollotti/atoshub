import { Handshake } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { CreditSimulator } from "@/components/simulators/CreditSimulator";

const features = [
  {
    title: "Project Finance",
    description: "Estruturação de financiamento para projetos de infraestrutura com base no fluxo de caixa futuro."
  },
  {
    title: "Financiamento Imobiliário Corporativo",
    description: "Soluções para aquisição, construção ou reforma de imóveis comerciais e industriais."
  },
  {
    title: "Crédito com Garantia Real",
    description: "Operações lastreadas em ativos imobiliários ou recebíveis com taxas diferenciadas."
  },
  {
    title: "Sale & Leaseback",
    description: "Transforme seu imóvel em capital de giro mantendo a operação no mesmo local."
  },
  {
    title: "Built to Suit",
    description: "Financiamento para construção de imóveis sob medida para sua operação."
  },
  {
    title: "Refinanciamento",
    description: "Reestruturação de dívidas existentes em condições mais favoráveis."
  }
];

const benefits = [
  "Operações de R$ 5 milhões a R$ 500 milhões",
  "Prazos de até 20 anos para operações imobiliárias",
  "Taxas atreladas a CDI, IPCA ou TR",
  "Estruturas de pagamento flexíveis",
  "Expertise em diversos setores",
  "Relacionamento com principais instituições do mercado",
  "Sigilo e profissionalismo em todas as operações"
];

const interestOptions = [
  "Project finance",
  "Aquisição de imóvel comercial/industrial",
  "Sale & Leaseback",
  "Built to Suit",
  "Refinanciamento",
  "Crédito com garantia real",
  "Outros"
];

export default function FinanciamentoCorporativo() {
  return (
    <SolutionPageLayout
      icon={Handshake}
      title="Financiamento Corporativo"
      subtitle="Para Empresas"
      description="Soluções robustas de financiamento imobiliário e de projetos para empresas que buscam crescer com solidez e planejamento."
      features={features}
      benefits={benefits}
      simulator={
        <CreditSimulator 
          title="Simule seu Projeto"
          maxValue={50000000}
          minValue={1000000}
          maxMonths={120}
          minMonths={12}
          defaultRate={1.29}
        />
      }
      solutionType="b2b"
      contactInterestOptions={interestOptions}
      ctaText="Apresentar projeto"
    />
  );
}
