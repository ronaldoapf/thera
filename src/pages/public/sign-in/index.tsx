import { ChartColumnDecreasing } from 'lucide-react'
import { LoginForm } from './components/login-form'

export function SignIn() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-6 p-4">
				<div className="flex w-full justify-start">
					<a href="#" className="flex items-center gap-2 font-medium">
						<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
							<ChartColumnDecreasing className="size-5" />
						</div>
						Acme Inc.
					</a>
				</div>
				<div className="flex w-full max-w-lg flex-col">
					<LoginForm />
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					alt="Login background"
					src="https://picsum.photos/1200/1200"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	)
}
