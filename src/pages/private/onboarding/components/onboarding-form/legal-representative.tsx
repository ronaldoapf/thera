import { motion } from "framer-motion"
import { Stethoscope } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { InputForm } from "@/components/form/input-form"
import { SelectForm } from "@/components/form/select-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { councilTypeOptions } from "@/constants/council-type-options"
import { useStepper } from "@/contexts/stepper-context"
import { cn } from "@/lib/utils"
import type { OnboardingFormData } from "./schemas"

export function LegalRepresentative() {
  const { next, back, currentStep } = useStepper()

  const form = useFormContext<OnboardingFormData>()

  const {
    trigger,
    control,
    formState: { isSubmitting },
  } = form

  const handleNext = async () => {
    const isValid = await trigger(["councilType", "registrationNumber"])

    if (isValid) {
      next()
    }
  }

  const handleBack = () => {
    back()
  }

  const isFirstStep = currentStep === 1

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Quem responde tecnicamente?
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Informe o conselho profissional principal vinculado à clínica.
          </p>
        </div>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="councilType">Conselho</FieldLabel>
          <SelectForm
            name="councilType"
            control={control}
            disabled={isSubmitting}
            options={councilTypeOptions}
            placeholder="Selecione o conselho"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="registrationNumber">
            Número de Registro
          </FieldLabel>
          <InputForm
            control={control}
            disabled={isSubmitting}
            name="registrationNumber"
            placeholder="123456 (Apenas números)"
          />
        </Field>
      </FieldGroup>

      <div
        className={cn(
          "mt-4 flex gap-3",
          "fixed right-0 bottom-0 left-0 z-50 border-t bg-background/80 p-4 shadow-lg backdrop-blur-sm",
          "lg:relative lg:right-auto lg:bottom-auto lg:left-auto lg:border-t-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
        )}
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          type="button"
          variant="default"
          className="flex-1"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          Próximo
        </Button>
      </div>
    </motion.div>
  )
}
