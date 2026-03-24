import type { CollaboratorRoleEnum } from '@/constants/enums/collaborator-role-enum'
import { cn } from '@/lib/utils'

const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
	ADMIN: {
		label: 'Administrador',
		className:
			'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
	},
	THERAPIST: {
		label: 'Terapeuta',
		className:
			'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	},
	RECEPTIONIST: {
		label: 'Recepcionista',
		className:
			'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
	},
}

interface CollaboratorBadgeProps {
	role: CollaboratorRoleEnum
}

export function CollaboratorBadge({ role }: CollaboratorBadgeProps) {
	const config = ROLE_CONFIG[role]
	if (!config) {
		return <span className="text-sm text-muted-foreground">—</span>
	}
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
				config.className,
			)}
		>
			{config.label}
		</span>
	)
}
