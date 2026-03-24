import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SelectOption } from '../form/select-form'

const ITEM_HEIGHT = 36
const LIST_HEIGHT = 252
const OVERSCAN = 3

export type VirtualSelectProps = {
	options: SelectOption[]
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	disabled?: boolean
	invalid?: boolean
	className?: string
}

export function VirtualSelect({
	options,
	value,
	onChange,
	placeholder,
	disabled,
	invalid,
	className,
}: VirtualSelectProps) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [scrollTop, setScrollTop] = useState(0)
	const [activeIndex, setActiveIndex] = useState(-1)

	const uid = useId()
	const listId = `${uid}-listbox`
	const getOptionId = (index: number) => `${uid}-option-${index}`

	const containerRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const wasOpenRef = useRef(false)

	const filteredOptions = useMemo(() => {
		if (!search.trim()) return options
		const lower = search.toLowerCase()
		return options.filter((opt) => opt.label.toLowerCase().includes(lower))
	}, [options, search])

	const totalHeight = filteredOptions.length * ITEM_HEIGHT
	const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN)
	const visibleCount = Math.ceil(LIST_HEIGHT / ITEM_HEIGHT)
	const endIndex = Math.min(
		filteredOptions.length - 1,
		startIndex + visibleCount + OVERSCAN,
	)
	const virtualItems = filteredOptions.slice(startIndex, endIndex + 1)

	const selectedLabel = options.find((opt) => opt.value === value)?.label
	const listHeight = Math.min(LIST_HEIGHT, filteredOptions.length * ITEM_HEIGHT)

	const closeDropdown = useCallback(() => {
		setOpen(false)
		setSearch('')
		setActiveIndex(-1)
	}, [])

	const handleOpen = useCallback(() => {
		if (disabled) return
		setOpen((prev) => !prev)
	}, [disabled])

	const handleSelect = useCallback(
		(val: string) => {
			onChange?.(val)
			closeDropdown()
			triggerRef.current?.focus()
		},
		[onChange, closeDropdown],
	)

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop)
	}, [])

	const scrollActiveIntoView = useCallback((index: number) => {
		if (!listRef.current) return
		const itemTop = index * ITEM_HEIGHT
		const itemBottom = itemTop + ITEM_HEIGHT
		const { scrollTop: currentScrollTop, clientHeight } = listRef.current
		if (itemTop < currentScrollTop) {
			listRef.current.scrollTop = itemTop
		} else if (itemBottom > currentScrollTop + clientHeight) {
			listRef.current.scrollTop = itemBottom - clientHeight
		}
	}, [])

	// When opening, set activeIndex to the currently selected option.
	// wasOpenRef guards against re-running when filteredOptions changes while open.
	useEffect(() => {
		if (open && !wasOpenRef.current) {
			const idx = filteredOptions.findIndex((opt) => opt.value === value)
			setActiveIndex(idx)
			if (idx >= 0) scrollActiveIntoView(idx)
			setTimeout(() => inputRef.current?.focus(), 0)
		}
		wasOpenRef.current = open
	}, [open, filteredOptions, value, scrollActiveIntoView])

	useEffect(() => {
		if (!open) return
		const handler = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) {
				closeDropdown()
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [open, closeDropdown])

	const handleInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			switch (e.key) {
				case 'ArrowDown': {
					e.preventDefault()
					const next = Math.min(activeIndex + 1, filteredOptions.length - 1)
					setActiveIndex(next)
					scrollActiveIntoView(next)
					break
				}
				case 'ArrowUp': {
					e.preventDefault()
					const prev = Math.max(activeIndex - 1, 0)
					setActiveIndex(prev)
					scrollActiveIntoView(prev)
					break
				}
				case 'Enter': {
					e.preventDefault()
					if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
						handleSelect(filteredOptions[activeIndex].value)
					}
					break
				}
				case 'Escape': {
					e.preventDefault()
					closeDropdown()
					triggerRef.current?.focus()
					break
				}
				case 'Tab': {
					closeDropdown()
					break
				}
			}
		},
		[
			activeIndex,
			filteredOptions,
			handleSelect,
			closeDropdown,
			scrollActiveIntoView,
		],
	)

	const handleTriggerKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === 'ArrowDown' && !open) {
				e.preventDefault()
				setOpen(true)
			}
		},
		[open],
	)

	return (
		<div ref={containerRef} className={cn('relative', className)}>
			<button
				ref={triggerRef}
				type="button"
				disabled={disabled}
				onClick={handleOpen}
				onKeyDown={handleTriggerKeyDown}
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-controls={open ? listId : undefined}
				aria-invalid={invalid}
				className={cn(
					'flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none',
					'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
				)}
			>
				<span className={cn(!value && 'text-muted-foreground')}>
					{selectedLabel ?? placeholder}
				</span>
				<ChevronDownIcon
					className={cn(
						'size-4 shrink-0 text-muted-foreground transition-transform duration-150',
						open && 'rotate-180',
					)}
				/>
			</button>

			{open && (
				<div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10">
					<div className="border-b border-input px-2 py-1.5">
						<input
							ref={inputRef}
							type="text"
							role="combobox"
							aria-autocomplete="list"
							aria-expanded={open}
							aria-controls={listId}
							aria-activedescendant={
								activeIndex >= 0 ? getOptionId(activeIndex) : undefined
							}
							value={search}
							onChange={(e) => {
								setSearch(e.target.value)
								setActiveIndex(-1)
								setScrollTop(0)
								if (listRef.current) listRef.current.scrollTop = 0
							}}
							onKeyDown={handleInputKeyDown}
							placeholder="Buscar..."
							className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
						/>
					</div>

					{filteredOptions.length === 0 ? (
						<div
							role="status"
							aria-live="polite"
							className="py-4 text-center text-sm text-muted-foreground"
						>
							Nenhum resultado encontrado
						</div>
					) : (
						<div
							id={listId}
							ref={listRef}
							role="listbox"
							className="overflow-y-auto"
							style={{ height: listHeight }}
							onScroll={handleScroll}
						>
							<div className="relative" style={{ height: totalHeight }}>
								{virtualItems.map((option, i) => {
									const absoluteIndex = startIndex + i
									const isSelected = option.value === value
									const isActive = absoluteIndex === activeIndex
									return (
										<div
											id={getOptionId(absoluteIndex)}
											role="option"
											key={option.value}
											aria-selected={isSelected}
											tabIndex={-1}
											style={{ top: absoluteIndex * ITEM_HEIGHT }}
											className={cn(
												'absolute inset-x-0 flex h-9 cursor-pointer items-center justify-between px-3 text-sm select-none',
												'hover:bg-accent hover:text-accent-foreground',
												isSelected && 'bg-accent/50 font-medium',
												isActive && 'bg-accent text-accent-foreground',
											)}
											onMouseDown={(e) => {
												e.preventDefault()
												handleSelect(option.value)
											}}
											onMouseEnter={() => setActiveIndex(absoluteIndex)}
										>
											<span className="truncate">{option.label}</span>
											{isSelected && (
												<CheckIcon className="size-4 shrink-0 text-primary" />
											)}
										</div>
									)
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
