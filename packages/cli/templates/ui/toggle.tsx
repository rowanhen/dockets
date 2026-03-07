'use client'

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
	'inline-flex items-center justify-center gap-2 rounded-none text-xs font-medium uppercase tracking-wider transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'border-[length:var(--border-width)] border-dashed border-transparent hover:border-foreground/30 hover:bg-accent hover:text-accent-foreground data-pressed:border-foreground data-pressed:bg-foreground data-pressed:text-background',
				outline:
					'border-[length:var(--border-width)] border-dashed border-foreground bg-transparent hover:bg-accent hover:text-accent-foreground data-pressed:bg-foreground data-pressed:text-background',
			},
			size: {
				default: 'h-9 px-3',
				sm: 'h-8 px-2.5',
				lg: 'h-10 px-4',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Toggle({
	className,
	variant,
	size,
	...props
}: TogglePrimitive.Root.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

export { Toggle, toggleVariants }
