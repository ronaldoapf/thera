import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<FieldGroup>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Forgot your password?</h1>
					<p className="text-sm text-balance text-muted-foreground">
						No worries, we'll send you reset instructions.
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<Button type="submit">Send Reset Instructions</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
