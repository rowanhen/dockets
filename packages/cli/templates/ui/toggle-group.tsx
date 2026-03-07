'use client'

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
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
}: ToggleGroupPrimitive.Root.Props & VariantProps<typeof toggleVariants>) {
	return (
		<ToggleGroupContext.Provider value={{ variant, size }}>
			<ToggleGroupPrimitive.Root
				data-slot="toggle-group"
				className={cn(
					// Container holds left+top border; items add right+bottom (newspaper pattern)
					'inline-flex items-center rounded-none border-[length:var(--border-width)] border-foreground',
					className,
				)}
				{...props}
			>
				{children}
			</ToggleGroupPrimitive.Root>
		</ToggleGroupContext.Provider>
	)
}

function ToggleGroupItem({
	className,
	variant,
	size,
	children,
	...props
}: ToggleGroupPrimitive.Item.Props & VariantProps<typeof toggleVariants>) {
	const ctx = React.useContext(ToggleGroupContext)
	const resolvedVariant = variant ?? ctx.variant
	const resolvedSize = size ?? ctx.size

	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			className={cn(
				toggleVariants({ variant: resolvedVariant, size: resolvedSize }),
				// No stacking: container owns left border; items add right border except last
				'rounded-none border-0',
				'[&:not(:last-child)]:border-r-[length:var(--border-width)] [&:not(:last-child)]:border-foreground',
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	)
}

export { ToggleGroup, ToggleGroupItem }
