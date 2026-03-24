import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>
	title: string
	className?: string
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return (
			<span className={cn('text-xs font-semibold uppercase tracking-wider text-muted-foreground', className)}>
				{title}
			</span>
		)
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			className={cn(
				'-ml-2 h-7 gap-1',
				'text-xs font-semibold uppercase tracking-wider text-muted-foreground',
				'hover:text-foreground',
				column.getIsSorted() && 'text-foreground',
				className,
			)}
			onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
		>
			{title}
			{column.getIsSorted() === 'asc' ? (
				<ArrowUp data-icon="inline-end" className="text-primary" />
			) : column.getIsSorted() === 'desc' ? (
				<ArrowDown data-icon="inline-end" className="text-primary" />
			) : (
				<ChevronsUpDown
					data-icon="inline-end"
					className="text-muted-foreground/50"
				/>
			)}
		</Button>
	)
}
