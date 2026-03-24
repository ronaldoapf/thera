import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Stepper } from "@/components/stepper"
import { useStepper } from "@/contexts/stepper-context"
import { ClinicLocation } from "./clinic-location"
import { ClinicRegistration } from "./clinic-registration"
import { LegalRepresentative } from "./legal-representative"
import { type OnboardingFormData, onboardingFormSchema } from "./schemas"

export function OnboardingForm() {
  const { currentStep, totalSteps } = useStepper()

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      city: "",
      cnpj: "",
      state: "",
      phone: "",
      legalName: "",
      clinicName: "",
      councilType: "",
      registrationNumber: "",
      municipalRegistration: "",
    },
  })

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 z-40 bg-background p-4 shadow-sm lg:relative lg:mb-16 lg:p-0 lg:shadow-none">
        <div className="mx-auto max-w-lg lg:max-w-none">
          <Stepper
            totalSteps={totalSteps}
            currentStep={currentStep}
            labels={["Clínica", "Responsável", "Localização"]}
          />
        </div>
      </div>

      <div className="mt-2 h-[calc(100vh-153px)] overflow-auto pr-4 pb-4 lg:h-auto lg:overflow-visible lg:pr-0">
        <FormProvider {...form}>
          {currentStep === 0 && <ClinicRegistration />}

          {currentStep === 1 && <LegalRepresentative />}

          {currentStep === 2 && <ClinicLocation />}
        </FormProvider>
      </div>
    </div>
  )
}
