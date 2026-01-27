import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CreditSimulatorProps {
  title?: string;
  maxValue?: number;
  minValue?: number;
  maxMonths?: number;
  minMonths?: number;
  defaultRate?: number;
}

export const CreditSimulator = ({
  title = "Simule seu Crédito",
  maxValue = 500000,
  minValue = 1000,
  maxMonths = 60,
  minMonths = 6,
  defaultRate = 1.99,
}: CreditSimulatorProps) => {
  const [value, setValue] = useState(50000);
  const [months, setMonths] = useState(24);
  const [calculated, setCalculated] = useState(false);

  const monthlyRate = defaultRate / 100;
  const monthlyPayment = value * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - value;

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
          <Calculator className="h-6 w-6 text-atos-gold-dark" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground">{title}</h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Valor desejado: {formatCurrency(value)}
          </Label>
          <Slider
            value={[value]}
            onValueChange={(v) => setValue(v[0])}
            min={minValue}
            max={maxValue}
            step={1000}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatCurrency(minValue)}</span>
            <span>{formatCurrency(maxValue)}</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Prazo: {months} meses
          </Label>
          <Slider
            value={[months]}
            onValueChange={(v) => setMonths(v[0])}
            min={minMonths}
            max={maxMonths}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{minMonths} meses</span>
            <span>{maxMonths} meses</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Taxa a partir de {defaultRate}% a.m.</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Parcela estimada</p>
              <p className="text-2xl font-bold text-atos-gold-dark">{formatCurrency(monthlyPayment)}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Total a pagar</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-atos-blue hover:bg-atos-blue-deep text-white py-6">
          <TrendingUp className="mr-2 h-5 w-5" />
          Solicitar Proposta
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          * Simulação com fins ilustrativos. Valores sujeitos à análise de crédito.
        </p>
      </div>
    </motion.div>
  );
};
