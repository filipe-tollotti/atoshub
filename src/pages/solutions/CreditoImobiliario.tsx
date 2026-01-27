import { Home } from "lucide-react";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { MortgageSimulator } from "@/components/simulators/MortgageSimulator";

const features = [
  {
    title: "Análise Personalizada",
    description: "Avaliamos seu perfil e capacidade de pagamento para encontrar as melhores condições do mercado."
  },
  {
    title: "Múltiplas Opções",
    description: "Acesso a diversas instituições financeiras para comparar taxas e escolher a melhor oferta."
  },
  {
    title: "Documentação Facilitada",
    description: "Orientação completa sobre documentos necessários e suporte em cada etapa do processo."
  },
  {
    title: "Avaliação do Imóvel",
    description: "Coordenamos a vistoria e avaliação do imóvel junto às instituições parceiras."
  },
  {
    title: "Acompanhamento Dedicado",
    description: "Um especialista acompanha seu processo do início ao fim, mantendo você informado."
  },
  {
    title: "Uso do FGTS",
    description: "Orientação sobre como utilizar seu FGTS na entrada ou amortização do financiamento."
  }
];

const benefits = [
  "Taxas a partir de 0.95% ao mês + TR",
  "Financiamento de até 80% do valor do imóvel",
  "Prazos de até 35 anos para pagamento",
  "Possibilidade de usar FGTS",
  "Análise gratuita sem compromisso",
  "Sem taxas de intermediação",
  "Opções de portabilidade de financiamento existente"
];

const interestOptions = [
  "Compra de imóvel residencial",
  "Compra de imóvel comercial",
  "Construção",
  "Portabilidade de financiamento",
  "Uso do FGTS",
  "Outros"
];

export default function CreditoImobiliario() {
  return (
    <SolutionPageLayout
      icon={Home}
      title="Crédito Imobiliário"
      subtitle="Para Você"
      description="Realize o sonho da casa própria com financiamento imobiliário sob medida, taxas competitivas e acompanhamento especializado."
      features={features}
      benefits={benefits}
      simulator={<MortgageSimulator />}
      solutionType="b2c"
      contactInterestOptions={interestOptions}
      ctaText="Simular financiamento"
    />
  );
}
