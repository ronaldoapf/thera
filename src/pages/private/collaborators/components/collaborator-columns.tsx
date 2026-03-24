import type { ColumnDef } from '@tanstack/react-table'
import { Copy, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { CollaboratorBadge } from '@/components/collaborator-badge'
import { CollaboratorTags } from '@/components/collaborator-tags'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { CollaboratorRoleEnum } from '@/constants/enums/collaborator-role-enum'
import { cn } from '@/lib/utils'

export type Collaborator = {
	id: string
	name: string
	role: CollaboratorRoleEnum
	email: string
	createdAt: string
	isActive: boolean
	inviteStatus: 'PENDING' | 'ACCEPTED'
	expertise?: string
	expiresAt?: string
}

interface CollaboratorColumnsActions {
	onEdit: (collaborator: Collaborator) => void
	onDeactivate: (id: string) => void
	onCancelInvite: (id: string) => void
}

function getInitials(name: string) {
	return name
		.split(' ')
		.slice(0, 2)
		.map((n) => n[0])
		.join('')
		.toUpperCase()
}

export function createCollaboratorColumns({
	onEdit,
	onDeactivate,
	onCancelInvite,
}: CollaboratorColumnsActions): ColumnDef<Collaborator>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Colaborador',
			enableSorting: true,
			cell: ({ row }) => {
				const { name } = row.original
				return (
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarFallback>{getInitials(name)}</AvatarFallback>
						</Avatar>
						<span className="font-medium text-sm">{name}</span>
					</div>
				)
			},
		},
		{
			accessorKey: 'role',
			header: 'Cargo',
			cell: ({ row }) => <CollaboratorBadge role={row.getValue('role')} />,
		},
		{
			accessorKey: 'expertise',
			header: 'Especialidade',
			cell: ({ row }) => (
				<span className="text-sm text-muted-foreground">
					{row.getValue('expertise') || '—'}
				</span>
			),
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableSorting: true,
			cell: ({ row }) => (
				<span className="text-sm text-muted-foreground">
					{row.getValue('email')}
				</span>
			),
		},
		{
			accessorKey: 'createdAt',
			header: 'Cadastro',
			enableSorting: true,
			cell: ({ row }) => {
				const date = new Date(row.getValue('createdAt'))
				return (
					<span className="text-sm">
						{date.toLocaleDateString('pt-BR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						})}
					</span>
				)
			},
		},
		{
			accessorKey: 'tags',
			header: 'Tags',
			enableSorting: false,
			cell: ({ row }) => <CollaboratorTags userId={row.original.id} />,
		},
		{
			accessorKey: 'inviteStatus',
			header: 'Status',
			cell: ({ row }) => {
				const inviteStatus = row.getValue<'PENDING' | 'ACCEPTED'>(
					'inviteStatus',
				)

				if (inviteStatus === 'PENDING') {
					return (
						<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
							<span className="size-1.5 rounded-full bg-amber-500" />
							Pendente
						</span>
					)
				}

				const { isActive } = row.original
				return (
					<span
						className={cn(
							'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
							isActive
								? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
								: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
						)}
					>
						<span
							className={cn(
								'size-1.5 rounded-full',
								isActive ? 'bg-emerald-500' : 'bg-zinc-400',
							)}
						/>
						{isActive ? 'Ativo' : 'Inativo'}
					</span>
				)
			},
		},
		{
			id: 'actions',
			header: 'Ações',
			enableHiding: false,
			meta: { pinned: 'right' },
			cell: ({ row }) => {
				const collaborator = row.original
				const isPending = collaborator.inviteStatus === 'PENDING'

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm" aria-label="Abrir ações">
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-44">
							{isPending ? (
								<DropdownMenuItem
									variant="destructive"
									onSelect={() => onCancelInvite(collaborator.id)}
								>
									<Trash2 />
									Cancelar convite
								</DropdownMenuItem>
							) : (
								<>
									<DropdownMenuItem
										onSelect={() =>
											navigator.clipboard
												.writeText(collaborator.email)
												.then(() => toast.success('Email copiado!'))
										}
									>
										<Copy />
										Copiar email
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => onEdit(collaborator)}>
										<Pencil />
										Editar
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										variant="destructive"
										onSelect={() => onDeactivate(collaborator.id)}
									>
										<Trash2 />
										Inativar
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
}
