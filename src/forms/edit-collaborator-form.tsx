import type { CollaboratorRoleEnum } from '@/constants/enums/collaborator-role-enum'

interface EditCollaboratorData {
	name: string
	email: string
	role: CollaboratorRoleEnum
	expertise?: string
}

interface EditCollaboratorFormProps {
	collaborator: {
		id: string
		name: string
		email: string
		role: CollaboratorRoleEnum
		expertise?: string
	}
	onSuccess: (
		data: EditCollaboratorData,
		tagsToAdd: string[],
		tagsToRemove: string[],
	) => Promise<void>
}

// TODO: Implement collaborator edit form
export function EditCollaboratorForm({
	collaborator: _,
	onSuccess: __,
}: EditCollaboratorFormProps) {
	return (
		<div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
			Formulário de edição de colaborador
		</div>
	)
}
