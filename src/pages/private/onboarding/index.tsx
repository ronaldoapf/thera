import { motion } from "framer-motion"
import logoImage from "@/assets/logo.png"
import onboardingImage from "@/assets/onboarding.png"
import { StepperProvider } from "@/contexts/stepper-context"
import { OnboardingForm } from "./components/onboarding-form"

export function Onboarding() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeOut",
        duration: 0.6,
        delay: 0.2,
      }}
    >
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="hidden items-center justify-center bg-linear-to-b from-[#15B9FF] to-[#FFFFFF] lg:flex">
          <img src={onboardingImage} width={600} alt="Onboarding" />
          <img
            src={logoImage}
            width={160}
            className="absolute bottom-10 left-10"
            alt="Logo Thera"
          />
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg space-y-8">
              <StepperProvider totalSteps={3}>
                <OnboardingForm />
              </StepperProvider>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
