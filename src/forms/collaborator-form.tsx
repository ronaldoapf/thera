// TODO: Implement collaborator creation form
interface CollaboratorFormProps {
	onSuccess: () => void
}

export function CollaboratorForm({ onSuccess: _ }: CollaboratorFormProps) {
	return (
		<div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
			Formulário de cadastro de colaborador
		</div>
	)
}
