import { z } from "zod";
import { isValidCNPJ } from "@/utils/isValidCnpj";

export const clinicRegistrationSchema = z.object({
  clinicName: z
    .string()
    .min(3, "Nome da clínica deve ter no mínimo 3 caracteres")
    .max(100, "Nome da clínica deve ter no máximo 100 caracteres"),
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine(isValidCNPJ, "CNPJ inválido. Deve conter 14 dígitos"),
  legalName: z
    .string()
    .min(3, "Razão social deve ter no mínimo 3 caracteres")
    .max(200, "Razão social deve ter no máximo 200 caracteres"),
  municipalRegistration: z
    .string()
    .min(1, "Inscrição municipal é obrigatória")
    .max(20, "Inscrição municipal deve ter no máximo 20 caracteres"),
});

export const clinicLocationSchema = z.object({
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  phone: z
    .string()
    .min(1, "Número de telefone é obrigatório")
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\d{11}$/, "Telefone deve conter 11 dígitos (ex: (34) 9 9119-2543)")
        .transform((value) => `+55${value}`)
    ),
});

export const legalRepresentativeSchema = z.object({
  councilType: z.string().min(2, "Estado é obrigatório"),
  registrationNumber: z.string().min(1, "Número de registro é obrigatório"),
});

export const onboardingFormSchema = z.object({
  ...clinicRegistrationSchema.shape,
  ...clinicLocationSchema.shape,
  ...legalRepresentativeSchema.shape,
});

export type ClinicRegistrationData = z.infer<typeof clinicRegistrationSchema>;
export type ClinicLocationData = z.infer<typeof clinicLocationSchema>;
export type LegalRepresentativeData = z.infer<typeof legalRepresentativeSchema>;
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
