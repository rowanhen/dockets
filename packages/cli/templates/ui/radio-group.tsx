'use client'

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import * as React from 'react'
import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Root.Props) {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn('flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

function RadioGroupItem({ className, ...props }: RadioGroupPrimitive.Item.Props) {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(
				'peer flex size-4 shrink-0 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'data-checked:bg-foreground',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="flex items-center justify-center"
			>
				<div className="size-1.5 rounded-[var(--radius)] bg-background" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
}

export { RadioGroup, RadioGroupItem }
