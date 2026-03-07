import * as React from 'react'
import { cn } from '@/lib/utils'

// Custom scrollbar via CSS — no heavy dependency.
// Uses scrollbar-width: thin + custom track/thumb colours via @layer utilities
// or explicit inline styles.

function ScrollArea({
	className,
	children,
	orientation = 'vertical',
	...props
}: React.ComponentProps<'div'> & {
	orientation?: 'vertical' | 'horizontal' | 'both'
}) {
	const overflowClass =
		orientation === 'both'
			? 'overflow-auto'
			: orientation === 'horizontal'
			? 'overflow-x-auto overflow-y-hidden'
			: 'overflow-y-auto overflow-x-hidden'

	return (
		<div
			data-slot="scroll-area"
			className={cn(
				'relative rounded-none',
				overflowClass,
				// Thin system scrollbar
				'[scrollbar-width:thin] [scrollbar-color:hsl(var(--foreground)/0.3)_transparent]',
				// Webkit
				'[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5',
				'[&::-webkit-scrollbar-track]:bg-transparent',
				'[&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-foreground/30 [&::-webkit-scrollbar-thumb]:hover:bg-foreground/50',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

function ScrollBar({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & {
	orientation?: 'vertical' | 'horizontal'
}) {
	return (
		<div
			data-slot="scroll-bar"
			data-orientation={orientation}
			className={cn(
				'flex touch-none select-none bg-transparent transition-colors',
				orientation === 'vertical' && 'h-full w-1.5 border-l-[length:var(--border-width)] border-l-transparent p-px',
				orientation === 'horizontal' && 'h-1.5 w-full border-t-[length:var(--border-width)] border-t-transparent p-px flex-col',
				className,
			)}
			{...props}
		>
			<div className="relative flex-1 rounded-none bg-foreground/30 hover:bg-foreground/50" />
		</div>
	)
}

export { ScrollArea, ScrollBar }
