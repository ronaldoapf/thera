import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Settings() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Settings</h1>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<header>
						<h2 className="text-lg font-semibold">General</h2>
						<span className="text-gray-400">Update your general settings</span>
					</header>

					<div className="w-full">
						<Card>
							<CardTitle>General settings</CardTitle>
							<CardDescription>Update your general settings</CardDescription>

							<CardContent>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</Field>
								</FieldGroup>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="account">Account content</TabsContent>
			</Tabs>
		</div>
	)
}
