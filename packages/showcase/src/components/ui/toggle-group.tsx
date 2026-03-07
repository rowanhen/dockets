'use client'

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'

interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
	variant: 'default',
	size: 'default',
})

function ToggleGroup({
	className,
	variant = 'outline',
	size = 'default',
	children,
	...props
}: ToggleGroupPrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<ToggleGroupContext.Provider value={{ variant, size }}>
			<ToggleGroupPrimitive
				data-slot="toggle-group"
				className={cn(
					// Container holds left+top border; items add right+bottom (newspaper pattern)
					'inline-flex items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground',
					className,
				)}
				{...props}
			>
				{children}
			</ToggleGroupPrimitive>
		</ToggleGroupContext.Provider>
	)
}

function ToggleGroupItem({
	className,
	variant,
	size,
	children,
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	const ctx = React.useContext(ToggleGroupContext)
	const resolvedVariant = variant ?? ctx.variant
	const resolvedSize = size ?? ctx.size

	return (
		<TogglePrimitive
			data-slot="toggle-group-item"
			className={cn(
				toggleVariants({ variant: resolvedVariant, size: resolvedSize }),
				// No stacking: container owns left border; items add right border except last
				'rounded-[var(--radius)] border-0',
				'[&:not(:last-child)]:border-r-[length:var(--border-width)] [&:not(:last-child)]:border-foreground',
				className,
			)}
			{...props}
		>
			{children}
		</TogglePrimitive>
	)
}

export { ToggleGroup, ToggleGroupItem }
