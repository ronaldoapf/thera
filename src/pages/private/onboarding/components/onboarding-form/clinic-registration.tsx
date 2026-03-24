import { motion } from "framer-motion"
import { Building2 } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { InputForm } from "@/components/form/input-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useStepper } from "@/contexts/stepper-context"
import { cn } from "@/lib/utils"
import type { OnboardingFormData } from "./schemas"

export function ClinicRegistration() {
  const { next, currentStep } = useStepper()

  const form = useFormContext<OnboardingFormData>()

  const {
    trigger,
    control,
    formState: { isSubmitting },
  } = form

  const handleNext = async () => {
    const isValid = await trigger([
      "clinicName",
      "cnpj",
      "legalName",
      "municipalRegistration",
    ])

    console.log("isValid", isValid)
    if (isValid) {
      next()
    }
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
          <Building2 className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Vamos registrar sua Clínica
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Precisamos dos dados fiscais para emitir notas e garantir a
            segurança.
          </p>
        </div>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="clinicName">Nome da Clínica</FieldLabel>
          <InputForm
            control={control}
            name="clinicName"
            type="text"
            disabled={isSubmitting}
            placeholder="Clínica Saúde"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>
          <InputForm
            name="cnpj"
            type="text"
            control={control}
            disabled={isSubmitting}
            placeholder="00.000.000/0001-91"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="legalName">Razão Social</FieldLabel>
          <InputForm
            type="text"
            name="legalName"
            control={control}
            disabled={isSubmitting}
            placeholder="Clínica Saúde e Bem-Estar Ltda"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="municipalRegistration">
            Inscrição Municipal
          </FieldLabel>
          <InputForm
            type="text"
            control={control}
            placeholder="12345678"
            disabled={isSubmitting}
            name="municipalRegistration"
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
