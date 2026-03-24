import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import z from "zod"
import { useForgotPassword } from "@/api/auth/hooks"
import logo from "@/assets/logo.png"
import { InputForm } from "@/components/form/input-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const forgotPasswordFormSchema = z.object({
  email: z.email({
    message: "Insira um e-mail válido",
  }),
})

type ForgotPasswordFormProps = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPasswordForm({
  className,
}: React.ComponentProps<"form">) {
  const {
    mutateAsync: forgotUserPassword,
    isPending: isPendingForgotUserPassword,
  } = useForgotPassword()

  const form = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async ({ email }: ForgotPasswordFormProps) => {
    try {
      await forgotUserPassword(email)
      toast.success("Link de recuperação enviado! Verifique seu e-mail.")
    } catch {
      toast.error("Erro ao enviar link. Tente novamente mais tarde.")
    }
  })

  const isFormSubmitting = isSubmitting || isPendingForgotUserPassword

  return (
    <form className={cn("flex flex-col gap-8", className)} onSubmit={onSubmit}>
      <div className="flex justify-center">
        <img src={logo} width={110} alt="Thera" />
      </div>

      <div className="space-y-2">
        <h1
          className="text-2xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: '"Montserrat Variable", sans-serif' }}
        >
          Esqueceu sua senha?
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          Sem problema. Insira seu e-mail e enviaremos um link para você criar
          uma nova senha.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputForm
            required
            id="email"
            type="email"
            name="email"
            className="h-11"
            control={control}
            disabled={isFormSubmitting}
            placeholder="seu@email.com"
          />
        </Field>
        <Button
          type="submit"
          disabled={isFormSubmitting}
          className="mt-1 h-11 w-full gap-2 font-medium"
        >
          Enviar link de redefinição
          {isFormSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </FieldGroup>

      <Link
        to="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Voltar para o login
      </Link>
    </form>
  )
}
