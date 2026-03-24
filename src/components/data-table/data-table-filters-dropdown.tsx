import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { DataTableFilterField } from './types'

interface DataTableFiltersDropdownProps {
	filterFields: DataTableFilterField[]
	onAdd: (fieldId: string) => void
	activeCount: number
}

export function DataTableFiltersDropdown({
	filterFields,
	onAdd,
	activeCount,
}: DataTableFiltersDropdownProps) {
	if (filterFields.length === 0) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 gap-1 data-[active]:border-primary data-[active]:text-primary"
					data-active={activeCount > 0 || undefined}
				>
					<Filter data-icon="inline-start" />
					Filters
					{activeCount > 0 && (
						<span className="-mr-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
							{activeCount}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-40">
				{filterFields.map((field) => (
					<DropdownMenuItem key={field.id} onSelect={() => onAdd(field.id)}>
						{field.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
