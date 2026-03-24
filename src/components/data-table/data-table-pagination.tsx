import type { Table } from '@tanstack/react-table'
import {
	ChevronFirst,
	ChevronLast,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100']

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const { pageIndex, pageSize } = table.getState().pagination
	const pageCount = table.getPageCount()
	const rowCount = table.getRowCount()

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
			<p className="shrink-0">
				{rowCount > 0
					? `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, rowCount)} of ${rowCount} row${rowCount !== 1 ? 's' : ''}`
					: 'No results'}
			</p>

			<div className="flex flex-wrap items-center gap-4">
				<div className="flex items-center gap-2">
					<span className="shrink-0">Rows per page</span>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => table.setPageSize(Number(value))}
					>
						<SelectTrigger size="sm" className="w-16">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{PAGE_SIZE_OPTIONS.map((size) => (
									<SelectItem key={size} value={size}>
										{size}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<span className="shrink-0">
					Page {pageIndex + 1} of {Math.max(1, pageCount)}
				</span>

				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						aria-label="First page"
					>
						<ChevronFirst />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						aria-label="Previous page"
					>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						aria-label="Next page"
					>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => table.setPageIndex(pageCount - 1)}
						disabled={!table.getCanNextPage()}
						aria-label="Last page"
					>
						<ChevronLast />
					</Button>
				</div>
			</div>
		</div>
	)
}
