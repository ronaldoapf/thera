import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { useRegister } from "@/api/auth/hooks"
import { InputForm } from "@/components/form/input-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

const signUpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const { mutateAsync: registerUser, isPending: isPendingRegisterUser } =
    useRegister()

  const { control, handleSubmit } = form

  const onSubmitForm = handleSubmit(async (data: SignUpFormData) => {
    try {
      await registerUser(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      navigate(`/login?email=${encodeURIComponent(data.email)}`)
    } catch {
      toast.error("Erro ao realizar cadastro. Tente novamente mais tarde.")
    }
  })

  const isFormSubmitting = isPendingRegisterUser

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="space-y-2">
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: '"Montserrat Variable", sans-serif' }}
        >
          Crie sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha os campos abaixo para começar
        </p>
      </div>

      <form onSubmit={onSubmitForm}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nome completo</FieldLabel>
            <InputForm
              required
              id="name"
              type="text"
              name="name"
              className="h-11"
              control={control}
              placeholder="João Silva"
              disabled={isFormSubmitting}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputForm
              required
              id="email"
              type="email"
              name="email"
              className="h-11"
              control={control}
              placeholder="seu@email.com"
              disabled={isFormSubmitting}
              autoComplete="email webauthn"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <InputForm
              required
              id="password"
              name="password"
              type="password"
              className="h-11"
              control={control}
              disabled={isFormSubmitting}
              autoComplete="new-password webauthn"
            />
            <FieldDescription>Mínimo de 8 caracteres.</FieldDescription>
          </Field>
          <Button
            type="submit"
            disabled={isFormSubmitting}
            className="mt-1 h-11 w-full gap-2 font-medium"
          >
            Criar conta
            {isFormSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}
