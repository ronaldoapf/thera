import { createContext, type ReactNode, useContext, useState } from "react"

interface StepperContextValue {
  currentStep: number
  totalSteps: number
  isFirst: boolean
  isLast: boolean
  isValidating: boolean
  next: () => void
  nextAsync: (validate: () => Promise<boolean>) => Promise<void>
  back: () => void
  goTo: (step: number) => void
}

const StepperContext = createContext<StepperContextValue | null>(null)

interface StepperProviderProps {
  totalSteps: number
  children: ReactNode
}

export function StepperProvider({
  totalSteps,
  children,
}: StepperProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isValidating, setIsValidating] = useState(false)

  const next = () => setCurrentStep((s) => Math.min(s + 1, totalSteps))

  const nextAsync = async (validate: () => Promise<boolean>) => {
    setIsValidating(true)
    try {
      const isValid = await validate()
      if (isValid) {
        setCurrentStep((s) => Math.min(s + 1, totalSteps))
      }
    } finally {
      setIsValidating(false)
    }
  }

  const back = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const goTo = (step: number) =>
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)))

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        totalSteps,
        isFirst: currentStep === 1,
        isLast: currentStep === totalSteps,
        isValidating,
        next,
        nextAsync,
        back,
        goTo,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export function useStepper() {
  const ctx = useContext(StepperContext)
  if (!ctx) throw new Error("useStepper must be used inside StepperProvider")
  return ctx
}
