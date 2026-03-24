import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

interface StepperProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  className?: string
}

export function Stepper({
  currentStep,
  totalSteps,
  labels,
  className,
}: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i)
  const stepLabels = labels ?? steps.map((_, i) => `Passo ${i + 1}`)
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {steps.map((stepIndex) => {
          const isComplete = stepIndex < currentStep
          const isActive = stepIndex === currentStep
          const isLast = stepIndex === totalSteps - 1

          return (
            <Fragment key={stepIndex}>
              <div
                className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                  isComplete &&
                    "border-primary bg-primary text-primary-foreground",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15",
                  !isComplete &&
                    !isActive &&
                    "border-border bg-background text-muted-foreground"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isComplete ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.span
                      key={`num-${stepIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {stepIndex + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {!isLast && (
                <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    initial={false}
                    animate={{ width: isComplete ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>

      <div className="mt-2.5 flex">
        {steps.map((stepIndex) => {
          const isComplete = stepIndex < currentStep
          const isActive = stepIndex === currentStep
          const isLast = stepIndex === totalSteps - 1

          return (
            <Fragment key={stepIndex}>
              <div className="w-9 shrink-0 text-center">
                <span
                  className={cn(
                    "text-[11px] leading-tight font-medium transition-colors duration-200",
                    isActive
                      ? "font-semibold text-primary"
                      : isComplete
                        ? "text-primary/70"
                        : "text-muted-foreground"
                  )}
                >
                  {stepLabels[stepIndex]}
                </span>
              </div>
              {!isLast && <div className="flex-1" />}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
