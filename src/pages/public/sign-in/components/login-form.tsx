import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import z from "zod"
import { InputForm } from "@/components/form/input-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const loginFormSchema = z.object({
  email: z.email({
    error: "Insira um e-mail válido",
  }),
  password: z.string().min(6, {
    error: "Insira uma senha com no mínimo 6 caracteres",
  }),
})

type LoginFormProps = z.infer<typeof loginFormSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [searchParams] = useSearchParams()
  const emailFromUrl = searchParams.get("email") || ""

  const { login } = useAuth()

  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: emailFromUrl,
      password: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (data: LoginFormProps) => {
    try {
      await login(data)
      console.log(data)
    } catch {
      toast.error("Erro ao realizar login. Verifique suas credenciais.")
    }
  })

  const isFormSubmittingOrPending = isSubmitting

  return (
    <div className={cn("flex flex-col gap-8")} {...props}>
      <div className="space-y-2">
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: '"Montserrat Variable", sans-serif' }}
        >
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-muted-foreground">
          Insira suas credenciais para acessar sua conta
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputForm
              required
              id="email"
              name="email"
              type="email"
              className="h-11"
              control={control}
              placeholder="seu@email.com"
              disabled={isFormSubmittingOrPending}
            />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Link
                to="/forgot-password"
                className="text-xs text-primary transition-colors hover:text-primary/80"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <InputForm
              required
              id="password"
              name="password"
              type="password"
              className="h-11"
              control={control}
              placeholder="••••••••"
              disabled={isFormSubmittingOrPending}
              autoComplete="current-password webauthn"
            />
          </Field>
          <Button
            type="submit"
            className="mt-1 h-11 w-full gap-2 font-medium"
            disabled={isFormSubmittingOrPending}
          >
            Entrar na plataforma{" "}
            {isFormSubmittingOrPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldGroup>
        <Field>
          <FieldDescription className="text-center">
            Não tem uma conta?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Cadastre-se gratuitamente
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
