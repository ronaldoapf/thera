import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { DataTable, type DataTableFilterField } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { CollaboratorRoleEnum } from '@/constants/enums/collaborator-role-enum'
import { CollaboratorForm } from '@/forms/collaborator-form'
import { EditCollaboratorForm } from '@/forms/edit-collaborator-form'
import { usePageTitle } from '@/hooks/use-page-title'
import type { Collaborator } from './components/collaborator-columns'
import { useCollaboratorsTable } from './hooks/use-collaborators-table'

const filterFields: DataTableFilterField[] = [
	{
		id: 'status',
		label: 'Status',
		type: 'select',
		placeholder: 'Filtrar por status',
		options: [
			{ label: 'Ativo', value: 'active' },
			{ label: 'Inativo', value: 'inactive' },
			{ label: 'Pendente', value: 'pending' },
		],
	},
	{
		id: 'role',
		label: 'Cargo',
		type: 'multiple',
		placeholder: 'Filtrar por cargo',
		options: [
			{ label: 'Administrador', value: CollaboratorRoleEnum.ADMIN },
			{ label: 'Terapeuta', value: CollaboratorRoleEnum.THERAPIST },
			{ label: 'Recepcionista', value: CollaboratorRoleEnum.RECEPTIONIST },
		],
	},
]

export function Collaborators() {
	usePageTitle('Colaboradores')

	const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
	const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
	const [selectedCollaborator, setSelectedCollaborator] =
		useState<Collaborator | null>(null)

	const handleEdit = useCallback((collaborator: Collaborator) => {
		setSelectedCollaborator(collaborator)
		setIsEditSheetOpen(true)
	}, [])

	const {
		table,
		search,
		onSearchChange,
		setParam,
		resetFilters,
		searchParams,
		isFetching,
		updateCollaborator,
		updateCollaboratorRole,
	} = useCollaboratorsTable(handleEdit)

	return (
		<>
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold">Colaboradores</h1>
						<p className="text-sm text-muted-foreground">
							Gerencie os membros da sua equipe e seus acessos.
						</p>
					</div>
					<Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
						<SheetTrigger asChild>
							<Button>
								<Plus />
								Cadastrar colaborador
							</Button>
						</SheetTrigger>
						<SheetContent className="w-full sm:max-w-xl">
							<SheetHeader>
								<SheetTitle>Cadastrar colaborador</SheetTitle>
							</SheetHeader>
							<div className="flex flex-1 flex-col px-4">
								<CollaboratorForm onSuccess={() => setIsAddSheetOpen(false)} />
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<DataTable
					table={table}
					search={search}
					onSearchChange={onSearchChange}
					setParam={setParam}
					resetFilters={resetFilters}
					searchParams={searchParams}
					filterFields={filterFields}
					isLoading={isFetching}
					searchPlaceholder="Buscar por nome ou email..."
				/>
			</div>

			<Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
				<SheetContent className="w-full sm:max-w-xl">
					<SheetHeader>
						<SheetTitle>Editar colaborador</SheetTitle>
					</SheetHeader>
					<div className="flex flex-1 flex-col px-4">
						{selectedCollaborator && (
							<EditCollaboratorForm
								collaborator={selectedCollaborator}
								onSuccess={async (data, _tagsToAdd, _tagsToRemove) => {
									await updateCollaborator({
										id: selectedCollaborator.id,
										data: {
											name: data.name,
											email: data.email,
											expertise: data.expertise,
										},
									})
									if (data.role !== selectedCollaborator.role) {
										await updateCollaboratorRole({
											id: selectedCollaborator.id,
											role: data.role,
										})
									}
									setIsEditSheetOpen(false)
									toast.success('Colaborador atualizado com sucesso!')
								}}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}
