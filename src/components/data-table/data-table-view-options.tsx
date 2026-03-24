import type { Table } from '@tanstack/react-table'
import { Check, Columns3 } from 'lucide-react'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export function DataTableViewOptions<TData>({
	table,
}: DataTableViewOptionsProps<TData>) {
	const columns = table.getAllColumns().filter((col) => col.getCanHide())

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					<Columns3 data-icon="inline-start" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-40">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{columns.map((column) => {
					const isChecked = column.getIsVisible()
					return (
						<DropdownMenuPrimitive.CheckboxItem
							key={column.id}
							checked={isChecked}
							onCheckedChange={(value) => column.toggleVisibility(value)}
							onSelect={(e) => e.preventDefault()}
							className="relative flex cursor-default select-none items-center gap-2 rounded-md px-1.5 py-1 text-sm capitalize outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
						>
							<span
								className={cn(
									'flex size-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors',
									isChecked
										? 'border-primary bg-primary'
										: 'border-muted-foreground/50',
								)}
							>
								{isChecked && (
									<Check className="size-3 text-primary-foreground" />
								)}
							</span>
							{column.id}
						</DropdownMenuPrimitive.CheckboxItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
