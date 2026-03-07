import type * as React from 'react'

import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	Select as SelectPrimitive,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface SelectOptionData {
	value: string
	label: React.ReactNode
	disabled?: boolean
}

export interface SelectGroupData {
	label?: string
	options: SelectOptionData[]
}

export interface SelectProps {
	options?: SelectOptionData[]
	groups?: SelectGroupData[]
	placeholder?: string
	label?: string
	error?: string
	disabled?: boolean
	required?: boolean
	className?: string
	triggerClassName?: string
	value?: string
	defaultValue?: string
	onValueChange?: (value: string) => void
	children?: React.ReactNode
}

function Select({
	options,
	groups,
	placeholder = 'Select...',
	label,
	error,
	disabled = false,
	required = false,
	className,
	triggerClassName,
	value,
	defaultValue,
	onValueChange,
	children,
}: SelectProps) {
	const hasError = Boolean(error)

	const rootProps: Record<string, unknown> = { disabled }
	if (value !== undefined) rootProps.value = value
	if (defaultValue !== undefined) rootProps.defaultValue = defaultValue
	if (onValueChange !== undefined) rootProps.onValueChange = onValueChange

	const content = options ? (
		<SelectContent>
			{options.map((opt) => (
				<SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
					{opt.label}
				</SelectItem>
			))}
		</SelectContent>
	) : groups ? (
		<SelectContent>
			{groups.map((group, i) => (
				<SelectGroup key={`group-${i}`}>
					{group.label && <SelectLabel>{group.label}</SelectLabel>}
					{group.options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
							{opt.label}
						</SelectItem>
					))}
				</SelectGroup>
			))}
		</SelectContent>
	) : null

	return (
		<div className={cn('flex flex-col gap-1', className)} data-invalid={hasError || undefined}>
			{label && (
				<span className="text-xs font-medium uppercase tracking-wider">
					{label}
					{required && <span className="text-destructive ml-0.5">*</span>}
				</span>
			)}
			<SelectPrimitive {...rootProps}>
				<SelectTrigger
					className={triggerClassName}
					aria-invalid={hasError}
					aria-label={label || undefined}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				{content}
				{children}
			</SelectPrimitive>
			{error && <p className="text-[10px] text-destructive">{error}</p>}
		</div>
	)
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
