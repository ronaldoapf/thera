import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<FieldGroup>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<Link
							to="/forgot-password"
							className="ml-auto text-sm text-balance text-muted-foreground underline-offset-4 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input id="password" type="password" required />
				</Field>
				<Field>
					<Button type="submit">Login</Button>
				</Field>
			</FieldGroup>
			<FieldGroup>
				<Field>
					<FieldDescription className="text-center">
						Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	)
}
