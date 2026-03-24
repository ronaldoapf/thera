import { motion } from "framer-motion"
import login from "@/assets/login.png"
import logo from "@/assets/logo.png"
import { LoginForm } from "./components/login-form"

export function SignIn() {
  return (
    <div className="min-h-svh grid lg:grid-cols-[1fr_1.15fr] bg-background">
      {/* Left Panel — Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="flex flex-col px-8 py-10 md:px-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <img src={logo} width={130} alt="Thera" />
        </motion.div>

        <div className="flex flex-1 items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <LoginForm />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-muted-foreground"
        >
          © {new Date().getFullYear()} Thera. Todos os direitos reservados.
        </motion.p>
      </motion.div>

      {/* Right Panel — Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block"
      >
        <div className="relative m-4 h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-primary">
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
          <div className="absolute bottom-0 -left-20 size-80 rounded-full bg-white/[0.08] blur-3xl" />
          <div className="absolute top-1/2 right-0 size-64 rounded-full bg-white/[0.06] blur-2xl" />

          {/* Concentric rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] size-[680px] rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] size-[480px] rounded-full border border-white/[0.15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] size-[300px] rounded-full border border-white/20" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col p-10">
            <div className="flex flex-1 items-center justify-center">
              <img
                src={login}
                className="max-h-[62vh] w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                alt="Thera platform preview"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                Plataforma Terapêutica
              </p>
              <h2
                className="max-w-xs text-2xl font-bold leading-snug text-primary-foreground"
                style={{ fontFamily: '"Montserrat Variable", sans-serif' }}
              >
                Gestão inteligente para profissionais de saúde mental
              </h2>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
