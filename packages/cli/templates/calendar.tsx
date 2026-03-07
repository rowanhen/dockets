'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

export interface DatePickerProps {
	value?: Date
	onChange?: (date: Date) => void
	placeholder?: string
	className?: string
}

function DatePicker({ value, onChange, placeholder = 'Pick a date', className }: DatePickerProps) {
	const [open, setOpen] = React.useState(false)

	const formatted = value
		? value.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
		: placeholder

	return (
		<div className="relative inline-block">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="inline-flex h-8 items-center gap-2 rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground px-3 text-xs font-medium uppercase tracking-wider hover:bg-accent"
			>
				{formatted}
			</button>
			{open && (
				<div className="absolute top-full left-0 z-50 mt-1">
					<Calendar
						selected={value}
						onSelect={(date) => {
							onChange?.(date)
							setOpen(false)
						}}
						className={className}
					/>
				</div>
			)}
		</div>
	)
}

export { DatePicker, Calendar }
