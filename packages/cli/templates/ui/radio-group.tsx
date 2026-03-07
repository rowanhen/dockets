'use client'

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { Radio } from '@base-ui/react/radio'
import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn('flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

function RadioGroupItem({ className, ...props }: Radio.Root.Props) {
	return (
		<Radio.Root
			data-slot="radio-group-item"
			className={cn(
				'peer flex size-4 shrink-0 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent',
				'focus-ring',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'data-checked:bg-foreground',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		>
			<Radio.Indicator
				data-slot="radio-group-indicator"
				className="flex items-center justify-center"
			>
				<div className="size-1.5 rounded-[var(--radius)] bg-background" />
			</Radio.Indicator>
		</Radio.Root>
	)
}

export { RadioGroup, RadioGroupItem }
