import { motion } from "framer-motion"
import { MapPin, Sparkles } from "lucide-react"
import { useFormContext, useWatch } from "react-hook-form"
import { useGetCitiesFromState, useGetStates } from "@/api/ibge/hooks"
import { InputForm } from "@/components/form/input-form"
import { SelectForm } from "@/components/form/select-form"
import { VirtualSelectForm } from "@/components/form/virtual-select-form"
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useStepper } from "@/contexts/stepper-context"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import type { OnboardingFormData } from "./schemas"

export function ClinicLocation() {
  const { back, currentStep, totalSteps } = useStepper()

  const form = useFormContext<OnboardingFormData>()

  const { completeOnboarding, isLoading } = useAuth()

  const {
    trigger,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const selectedState = useWatch({ control, name: "state" })

  const { data: states } = useGetStates()

  const { data: citiesFromState, isLoading: isLoadingCitiesFromState } =
    useGetCitiesFromState(selectedState ?? "")

  const handleNext = async () => {
    const isValid = await trigger(["state", "city"])

    if (isValid) {
      await onSubmit()
    }
  }

  const handleBack = () => {
    back()
  }

  const onSubmit = handleSubmit(async (data: OnboardingFormData) => {
    await completeOnboarding(data)
  })

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MapPin className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Onde seus pacientes te encontram?
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Esses dados serão usados para agendamentos e lembretes automáticos.
          </p>
        </div>
      </div>

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="state">Estado</FieldLabel>
            <SelectForm
              name="state"
              control={control}
              disabled={isSubmitting || isLoading}
              placeholder="Selecione o estado"
              options={
                states?.map((state) => ({
                  label: state.nome,
                  value: state.sigla,
                })) || []
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="city">Cidade</FieldLabel>
            {isLoadingCitiesFromState ? (
              <Loading />
            ) : (
              <VirtualSelectForm
                name="city"
                control={control}
                options={
                  citiesFromState?.map((item) => {
                    return {
                      label: item.nome,
                      value: item.nome,
                    }
                  }) || []
                }
                placeholder={
                  !selectedState
                    ? "Selecione um estado primeiro"
                    : isLoadingCitiesFromState
                      ? "Carregando..."
                      : "Selecione uma cidade"
                }
                disabled={!selectedState || isLoadingCitiesFromState}
              />
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="phone">WhatsApp da Clínica</FieldLabel>
          <InputForm
            type="text"
            name="phone"
            control={control}
            placeholder="(99) 99999-9999"
            disabled={isSubmitting || isLoading}
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
          disabled={isFirstStep || isLoading}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          type="button"
          variant="default"
          className="z-0 flex-1 gap-2"
          onClick={handleNext}
          disabled={isSubmitting || isLoading}
        >
          {isLastStep ? (
            <>
              <Sparkles className="h-4 w-4" />
              Finalizar cadastro
            </>
          ) : (
            "Próximo"
          )}
        </Button>
      </div>
    </motion.div>
  )
}
