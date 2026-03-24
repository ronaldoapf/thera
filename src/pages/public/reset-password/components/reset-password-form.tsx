import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { useResetPassword } from "@/api/auth/hooks"
import logo from "@/assets/logo.png"
import { InputForm } from "@/components/form/input-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const resetPasswordFormSchema = z.object({
  newPassword: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({
  token,
  className,
}: ResetPasswordFormProps & React.ComponentProps<"form">) {
  const navigate = useNavigate()
  const {
    mutateAsync: resetUserPassword,
    isPending: isPendingResetUserPassword,
  } = useResetPassword()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(
    async ({ newPassword }: ResetPasswordFormValues) => {
      try {
        await resetUserPassword({ token, newPassword })
        toast.success(
          "Senha redefinida com sucesso! Faça login com sua nova senha."
        )
        navigate("/login")
      } catch {
        toast.error("Erro ao redefinir senha. O link pode ter expirado.")
      }
    }
  )

  const isFormSubmitting = isSubmitting || isPendingResetUserPassword

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
          Redefinir senha
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          Insira sua nova senha abaixo. Certifique-se de criar uma senha forte e
          segura.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="newPassword">Nova senha</FieldLabel>
          <InputForm
            required
            id="newPassword"
            type="password"
            name="newPassword"
            className="h-11"
            control={control}
            disabled={isFormSubmitting}
            placeholder="Sua nova senha"
            autoComplete="new-password"
          />
        </Field>
        <Button
          type="submit"
          disabled={isFormSubmitting}
          className="mt-1 h-11 w-full gap-2 font-medium"
        >
          Redefinir senha
          {isFormSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ShieldCheck className="size-4" />
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
