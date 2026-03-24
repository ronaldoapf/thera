import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
	useCancelInvite,
	useDeactiveCollaborator,
	useGetCollaborators,
	useUpdateCollaborator,
	useUpdateCollaboratorRole,
} from '@/api/collaborators/hooks'
import { useDataTable } from '@/hooks/use-data-table'
import {
	type Collaborator,
	createCollaboratorColumns,
} from '../components/collaborator-columns'

export function useCollaboratorsTable(
	onEdit: (collaborator: Collaborator) => void,
) {
	const [searchParams] = useSearchParams()
	const { data: rawData = [], isFetching } = useGetCollaborators()

	const { mutate: deactivate } = useDeactiveCollaborator(
		() => toast.success('Colaborador inativado com sucesso!'),
		() => toast.error('Erro ao inativar colaborador'),
	)
	const { mutateAsync: updateCollaborator } = useUpdateCollaborator()
	const { mutateAsync: updateCollaboratorRole } = useUpdateCollaboratorRole()
	const { mutate: cancelInvite } = useCancelInvite()

	const { filteredData, rowCount } = useMemo(() => {
		const search = (searchParams.get('search') ?? '').toLowerCase()
		const statusRaw = searchParams.get('status')
		const roleRaw = searchParams.get('role')
		const statuses = statusRaw ? statusRaw.split(',') : null
		const roles = roleRaw ? roleRaw.split(',') : null
		const sortParam = searchParams.get('sort') as keyof Collaborator | null
		const order = searchParams.get('order') ?? 'asc'
		const page = Math.max(1, Number(searchParams.get('page') ?? 1))
		const perPage = Number(searchParams.get('per_page') ?? 10)

		let filtered = rawData.filter((c) => {
			if (search && !`${c.name} ${c.email}`.toLowerCase().includes(search))
				return false
			if (statuses) {
				const colStatus =
					c.inviteStatus === 'PENDING'
						? 'pending'
						: c.isActive
							? 'active'
							: 'inactive'
				if (!statuses.includes(colStatus)) return false
			}
			if (roles && !roles.includes(c.role)) return false
			return true
		})

		if (sortParam) {
			filtered = [...filtered].sort((a, b) => {
				const av = String(a[sortParam] ?? '')
				const bv = String(b[sortParam] ?? '')
				const cmp = av.localeCompare(bv)
				return order === 'desc' ? -cmp : cmp
			})
		}

		const start = (page - 1) * perPage
		return {
			filteredData: filtered.slice(start, start + perPage) as Collaborator[],
			rowCount: filtered.length,
		}
	}, [rawData, searchParams])

	const handleCancelInvite = useCallback(
		(id: string) =>
			cancelInvite(id, {
				onSuccess: () => toast.success('Convite cancelado com sucesso!'),
				onError: () => toast.error('Erro ao cancelar convite'),
			}),
		[cancelInvite],
	)

	const handleDeactivate = useCallback(
		(id: string) => deactivate(id),
		[deactivate],
	)

	const columns = useMemo(
		() =>
			createCollaboratorColumns({
				onEdit,
				onDeactivate: handleDeactivate,
				onCancelInvite: handleCancelInvite,
			}),
		[onEdit, handleDeactivate, handleCancelInvite],
	)

	const { table, ...tableState } = useDataTable({
		data: filteredData,
		columns,
		rowCount,
		columnPinning: { right: ['actions'] },
	})

	return {
		table,
		...tableState,
		isFetching,
		updateCollaborator,
		updateCollaboratorRole,
	}
}
