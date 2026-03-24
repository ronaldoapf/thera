import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-8", className)} {...props}>
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

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="h-11"
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
          <Input id="password" type="password" required className="h-11" />
        </Field>
        <Button type="submit" className="mt-1 h-11 w-full gap-2 font-medium">
          Entrar na plataforma
          <ArrowRight className="size-4" />
        </Button>
      </FieldGroup>

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
    </form>
  )
}
