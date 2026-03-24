import { motion } from "framer-motion"
import { ForgotPasswordForm } from "./components/forgot-password-form"

export function ForgotPassword() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-primary p-6">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Depth blobs */}
      <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 -left-20 size-80 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/2 right-0 size-64 rounded-full bg-white/6 blur-2xl" />

      {/* Concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-200 rounded-full border border-white/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-140 rounded-full border border-white/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-85 rounded-full border border-white/20" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 w-full max-w-sm rounded-2xl bg-background p-8 shadow-2xl"
      >
        <ForgotPasswordForm />
      </motion.div>
    </div>
  )
}
