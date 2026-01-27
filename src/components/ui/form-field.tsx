import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string | null;
  touched?: boolean;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  required,
  className,
  onChange,
  onBlur,
}: FormFieldProps) => {
  const hasError = touched && error;
  const isValid = touched && !error && value.trim() !== "";

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label 
        htmlFor={id} 
        className={cn(
          "text-sm font-medium transition-colors",
          hasError && "text-destructive"
        )}
      >
        {label} {required && "*"}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "pr-10 transition-all",
            hasError && "border-destructive focus-visible:ring-destructive/30",
            isValid && "border-green-500 focus-visible:ring-green-500/30"
          )}
        />
        <AnimatePresence mode="wait">
          {hasError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="h-4 w-4 text-destructive" />
            </motion.div>
          )}
          {isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-destructive flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
