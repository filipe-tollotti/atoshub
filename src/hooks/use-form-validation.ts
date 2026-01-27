import { useState, useCallback } from "react";
import { z } from "zod";

// Phone mask utility
export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

// CPF mask utility: 000.000.000-00
export const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

// CNPJ mask utility: 00.000.000/0000-00
export const formatCNPJ = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

// CPF validation algorithm
export const validateCPFAlgorithm = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  
  if (digits.length !== 11) return false;
  
  // Check for known invalid CPFs
  if (/^(\d)\1{10}$/.test(digits)) return false;
  
  // First digit validation
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;
  
  // Second digit validation
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10])) return false;
  
  return true;
};

// CNPJ validation algorithm
export const validateCNPJAlgorithm = (cnpj: string): boolean => {
  const digits = cnpj.replace(/\D/g, "");
  
  if (digits.length !== 14) return false;
  
  // Check for known invalid CNPJs
  if (/^(\d)\1{13}$/.test(digits)) return false;
  
  // First digit validation
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(digits[12])) return false;
  
  // Second digit validation
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i]) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(digits[13])) return false;
  
  return true;
};

// Validation schemas
export const validationSchemas = {
  name: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(255, "E-mail deve ter no máximo 255 caracteres"),
  
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido. Use: (00) 00000-0000"),
  
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido. Use: 000.000.000-00")
    .refine(validateCPFAlgorithm, "CPF inválido"),
  
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido. Use: 00.000.000/0000-00")
    .refine(validateCNPJAlgorithm, "CNPJ inválido"),
  
  company: z
    .string()
    .trim()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres"),
  
  message: z
    .string()
    .trim()
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres")
    .optional(),
};

export type FieldName = keyof typeof validationSchemas;

interface FieldState {
  value: string;
  error: string | null;
  touched: boolean;
}

interface UseFormValidationReturn {
  fields: Record<string, FieldState>;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
  validateField: (field: string, value: string) => string | null;
  validateAll: () => boolean;
  resetForm: () => void;
  getFieldProps: (field: string) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: () => void;
  };
  isValid: boolean;
}

// Apply mask based on field name
const applyMask = (field: string, value: string): string => {
  switch (field) {
    case "phone":
      return formatPhone(value);
    case "cpf":
      return formatCPF(value);
    case "cnpj":
      return formatCNPJ(value);
    default:
      return value;
  }
};

export const useFormValidation = (
  initialFields: Record<string, string>,
  customValidation?: Record<string, z.ZodType>
): UseFormValidationReturn => {
  const [fields, setFields] = useState<Record<string, FieldState>>(() => {
    const initial: Record<string, FieldState> = {};
    Object.keys(initialFields).forEach((key) => {
      initial[key] = { value: initialFields[key], error: null, touched: false };
    });
    return initial;
  });

  const getSchema = (field: string): z.ZodType | undefined => {
    if (customValidation?.[field]) return customValidation[field];
    return validationSchemas[field as FieldName];
  };

  const validateField = useCallback(
    (field: string, value: string): string | null => {
      const schema = getSchema(field);
      if (!schema) return null;
  
      const result = schema.safeParse(value);
  
      if (result.success) return null;
  
      const firstError = result.error.issues?.[0];
  
      return firstError?.message ?? "Campo inválido";
    },
    [customValidation]
  );

  const handleChange = useCallback((field: string, value: string) => {
    // Apply appropriate mask
    const processedValue = applyMask(field, value);
    
    setFields((prev) => {
      const error = prev[field]?.touched ? validateField(field, processedValue) : null;
      return {
        ...prev,
        [field]: { value: processedValue, error, touched: prev[field]?.touched || false },
      };
    });
  }, [validateField]);

  const handleBlur = useCallback((field: string) => {
    setFields((prev) => {
      const currentValue = prev[field]?.value || "";
      const error = validateField(field, currentValue);
      return {
        ...prev,
        [field]: { ...prev[field], touched: true, error },
      };
    });
  }, [validateField]);

  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const newFields: Record<string, FieldState> = {};

    Object.keys(fields).forEach((field) => {
      const value = fields[field].value;
      const error = validateField(field, value);
      newFields[field] = { value, error, touched: true };
      if (error) isValid = false;
    });

    setFields(newFields);
    return isValid;
  }, [fields, validateField]);

  const resetForm = useCallback(() => {
    const initial: Record<string, FieldState> = {};
    Object.keys(fields).forEach((key) => {
      initial[key] = { value: "", error: null, touched: false };
    });
    setFields(initial);
  }, [fields]);

  const getFieldProps = useCallback((field: string) => ({
    value: fields[field]?.value || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleChange(field, e.target.value);
    },
    onBlur: () => handleBlur(field),
  }), [fields, handleChange, handleBlur]);

  const isValid = Object.values(fields).every(
    (field) => !field.error && (field.touched ? field.value.trim() !== "" : true)
  );

  return {
    fields,
    handleChange,
    handleBlur,
    validateField,
    validateAll,
    resetForm,
    getFieldProps,
    isValid,
  };
};
