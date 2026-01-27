import { useState } from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MortgageSimulator = () => {
  const [propertyValue, setPropertyValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [years, setYears] = useState(30);
  const [system, setSystem] = useState("sac");

  const loanAmount = propertyValue - downPayment;
  const monthlyRate = 0.0095; // 0.95% a.m.
  const months = years * 12;
  
  // SAC calculation (first installment)
  const amortization = loanAmount / months;
  const firstInterest = loanAmount * monthlyRate;
  const sacFirstPayment = amortization + firstInterest;
  
  // PRICE calculation
  const pricePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  
  const monthlyPayment = system === "sac" ? sacFirstPayment : pricePayment;
  const downPaymentPercent = (downPayment / propertyValue) * 100;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-8 shadow-lg border border-border"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-atos-gold/20 flex items-center justify-center">
          <Home className="h-6 w-6 text-atos-gold-dark" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground">Simule seu Financiamento</h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Valor do imóvel: {formatCurrency(propertyValue)}
          </Label>
          <Slider
            value={[propertyValue]}
            onValueChange={(v) => {
              setPropertyValue(v[0]);
              if (downPayment > v[0] * 0.8) {
                setDownPayment(v[0] * 0.2);
              }
            }}
            min={100000}
            max={2000000}
            step={10000}
            className="py-4"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Entrada: {formatCurrency(downPayment)} ({downPaymentPercent.toFixed(0)}%)
          </Label>
          <Slider
            value={[downPayment]}
            onValueChange={(v) => setDownPayment(v[0])}
            min={propertyValue * 0.1}
            max={propertyValue * 0.8}
            step={5000}
            className="py-4"
          />
          <p className="text-xs text-muted-foreground mt-1">Mínimo de 10% do valor do imóvel</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Prazo: {years} anos
          </Label>
          <Slider
            value={[years]}
            onValueChange={(v) => setYears(v[0])}
            min={5}
            max={35}
            step={1}
            className="py-4"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Sistema de Amortização
          </Label>
          <Select value={system} onValueChange={setSystem}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sac">SAC - Parcelas decrescentes</SelectItem>
              <SelectItem value="price">PRICE - Parcelas fixas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Taxa a partir de 0.95% a.m. + TR</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Valor financiado</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">{system === "sac" ? "1ª Parcela" : "Parcela fixa"}</p>
              <p className="text-xl font-bold text-atos-gold-dark">{formatCurrency(monthlyPayment)}</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-atos-blue hover:bg-atos-blue-deep text-white py-6">
          <TrendingUp className="mr-2 h-5 w-5" />
          Solicitar Análise
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          * Simulação com fins ilustrativos. Valores sujeitos à análise de crédito e aprovação.
        </p>
      </div>
    </motion.div>
  );
};
