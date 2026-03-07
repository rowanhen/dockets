import type * as React from 'react'
import { useRef, useState, useMemo } from 'react'
import { XIcon } from 'lucide-react'

import {
	Combobox as ComboboxPrimitive,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

export interface ComboboxOption {
	value: string
	label: string
	icon?: React.ReactNode
	description?: string
}

export interface ComboboxProps {
	options?: ComboboxOption[]
	value?: string[]
	onValueChange?: (ids: string[]) => void
	placeholder?: string
	emptyMessage?: string
	label?: string
	disabled?: boolean
	className?: string
	children?: React.ReactNode
}

function Combobox({
	options,
	value = [],
	onValueChange,
	placeholder = 'Search...',
	emptyMessage = 'No results found.',
	label,
	disabled = false,
	className,
	children,
}: ComboboxProps) {
	const [inputValue, setInputValue] = useState('')
	const anchorRef = useRef<HTMLDivElement>(null)

	const optionsByValue = useMemo(() => {
		const map = new Map<string, ComboboxOption>()
		for (const opt of options ?? []) {
			map.set(opt.value, opt)
		}
		return map
	}, [options])

	const filtered = useMemo(() => {
		if (!options) return []
		if (!inputValue) return options
		const lower = inputValue.toLowerCase()
		return options.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.description?.toLowerCase().includes(lower),
		)
	}, [options, inputValue])

	if (children) {
		return (
			<ComboboxPrimitive multiple disabled={disabled}>
				{children}
			</ComboboxPrimitive>
		)
	}

	const removeValue = (v: string) => {
		onValueChange?.(value.filter((x) => x !== v))
	}

	return (
		<div className={cn('flex flex-col gap-1', className)}>
			{label && (
				<span className="text-xs font-medium uppercase tracking-wider">
					{label}
				</span>
			)}
			<ComboboxPrimitive
				multiple
				value={value}
				onValueChange={(val) => onValueChange?.(val as string[])}
				disabled={disabled}
			>
				{/* Selected chips + inline search input */}
				<div ref={anchorRef} className="flex min-h-8 flex-wrap items-center gap-1 border border-input bg-transparent px-2.5 py-1 text-xs">
					{value.map((v) => {
						const opt = optionsByValue.get(v)
						return (
							<span
								key={v}
								className="flex items-center gap-1 bg-muted px-1.5 py-0.5 text-xs font-medium whitespace-nowrap"
							>
								{opt?.icon && <span className="shrink-0">{opt.icon}</span>}
								{opt?.label ?? v}
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation()
										removeValue(v)
									}}
									className="opacity-50 hover:opacity-100 cursor-pointer bg-transparent border-none p-0"
									aria-label={`Remove ${opt?.label ?? v}`}
								>
									<XIcon className="w-3 h-3" />
								</button>
							</span>
						)
					})}
					<ComboboxChipsInput
						placeholder={value.length === 0 ? placeholder : ''}
						value={inputValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
					/>
				</div>
				<ComboboxContent anchor={anchorRef}>
					<ComboboxList>
						{filtered.map((opt) => (
							<ComboboxItem key={opt.value} value={opt.value}>
								{opt.icon && (
									<span className="shrink-0">{opt.icon}</span>
								)}
								<span className="flex-1 min-w-0">
									<span className="text-xs">{opt.label}</span>
									{opt.description && (
										<span className="block text-[10px] text-muted-foreground">
											{opt.description}
										</span>
									)}
								</span>
							</ComboboxItem>
						))}
					</ComboboxList>
					<ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
				</ComboboxContent>
			</ComboboxPrimitive>
		</div>
	)
}

export {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
}
