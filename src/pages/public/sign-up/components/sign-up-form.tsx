import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { InputForm } from '@/components/form/input-form'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'

const signUpFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters long'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
	confirmPassword: z
		.string()
		.min(8, 'Confirm Password must be at least 8 characters long'),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignupForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const { control, handleSubmit } = form

	const onSubmitForm = handleSubmit((data: SignUpFormData) => {
		console.log(data)
	})

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>
						Enter your email below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmitForm}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<InputForm
									required
									id="name"
									type="text"
									name="name"
									control={control}
									placeholder="John Doe"
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<InputForm
									control={control}
									required
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									autoComplete="email webauthn"
								/>
							</Field>
							<Field>
								<Field className="grid grid-cols-2 gap-4">
									<Field>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<InputForm
											required
											id="password"
											name="password"
											type="password"
											control={control}
											autoComplete="new-password webauthn "
										/>
									</Field>
									<Field>
										<FieldLabel htmlFor="confirm-password">
											Confirm Password
										</FieldLabel>
										<InputForm
											required
											type="password"
											control={control}
											id="confirm-password"
											name="confirmPassword"
											autoComplete="new-password webauthn"
										/>
									</Field>
								</Field>
								<FieldDescription>
									Must be at least 8 characters long.
								</FieldDescription>
							</Field>
							<Field>
								<Button type="submit">Create Account</Button>
								<FieldDescription className="text-center">
									Already have an account? <Link to="/login">Login</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
