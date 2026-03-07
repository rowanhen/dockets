'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = [
	'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
	'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

interface CalendarProps {
	className?: string
	selected?: Date
	onSelect?: (date: Date) => void
	defaultMonth?: Date
	disabled?: (date: Date) => boolean
	mode?: 'single'
}

function Calendar({
	className,
	selected,
	onSelect,
	defaultMonth,
	disabled,
}: CalendarProps) {
	const today = new Date()
	const [viewDate, setViewDate] = React.useState(
		defaultMonth ?? selected ?? today,
	)

	const year = viewDate.getFullYear()
	const month = viewDate.getMonth()

	const firstDay = new Date(year, month, 1).getDay()
	const daysInMonth = new Date(year, month + 1, 0).getDate()

	const cells: (number | null)[] = [
		...Array(firstDay).fill(null),
		...Array.from({ length: daysInMonth }, (_, i) => i + 1),
	]
	// Pad to complete last row
	while (cells.length % 7 !== 0) cells.push(null)

	const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
	const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

	const isSelected = (day: number) => {
		if (!selected) return false
		return (
			selected.getFullYear() === year &&
			selected.getMonth() === month &&
			selected.getDate() === day
		)
	}

	const isToday = (day: number) =>
		today.getFullYear() === year &&
		today.getMonth() === month &&
		today.getDate() === day

	const isDisabled = (day: number) => {
		if (!disabled) return false
		return disabled(new Date(year, month, day))
	}

	return (
		<div
			data-slot="calendar"
			className={cn(
				'w-full max-w-xs rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-card text-card-foreground',
				className,
			)}
		>
			{/* Header — no stacking: outer border owns top+sides */}
			<div className="flex items-center justify-between border-b-[length:var(--border-width)] border-foreground px-3 py-2">
				<button
					type="button"
					onClick={prevMonth}
					className="flex size-6 items-center justify-center text-muted-foreground hover:text-foreground"
					aria-label="Previous month"
				>
					<ChevronLeftIcon className="size-3.5" />
				</button>
				<span className="text-xs font-medium uppercase tracking-wider">
					{MONTHS[month]} {year}
				</span>
				<button
					type="button"
					onClick={nextMonth}
					className="flex size-6 items-center justify-center text-muted-foreground hover:text-foreground"
					aria-label="Next month"
				>
					<ChevronRightIcon className="size-3.5" />
				</button>
			</div>

			{/* Day-of-week header */}
			{/* Newspaper grid: container holds border-t + border-l; cells add border-r + border-b */}
			<div className="grid grid-cols-7 border-b-[length:var(--border-width)] border-foreground">
				{DAYS.map((d) => (
					<div
						key={d}
						className="flex h-7 items-center justify-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
					>
						{d.slice(0, 2)}
					</div>
				))}
			</div>

			{/* Day cells */}
			<div className="grid grid-cols-7">
				{cells.map((day, idx) => {
					if (day === null) {
						return (
							<div
								key={`empty-${idx}`}
								className={cn(
									'h-8',
									// Newspaper border rule: right+bottom only
									(idx + 1) % 7 !== 0 && 'border-r-[length:var(--border-width)] border-foreground/20',
									idx < cells.length - 7 && 'border-b-[length:var(--border-width)] border-foreground/20',
								)}
							/>
						)
					}
					const sel = isSelected(day)
					const tod = isToday(day)
					const dis = isDisabled(day)
					return (
						<button
							key={day}
							type="button"
							disabled={dis}
							onClick={() => !dis && onSelect?.(new Date(year, month, day))}
							className={cn(
								'flex h-8 items-center justify-center text-xs',
								// Newspaper border rule
								(idx + 1) % 7 !== 0 && 'border-r-[length:var(--border-width)] border-foreground/20',
								idx < cells.length - 7 && 'border-b-[length:var(--border-width)] border-foreground/20',
								sel
									? 'bg-foreground text-background'
									: tod
									? 'border-[length:var(--border-width)] border-dashed border-foreground font-medium'
									: 'hover:bg-accent hover:text-accent-foreground',
								dis && 'pointer-events-none opacity-30',
							)}
						>
							{day}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export { Calendar }
