'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '@/lib/utils'

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				'peer inline-flex h-5 w-9 shrink-0 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'data-checked:bg-foreground',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					'pointer-events-none block size-3.5 rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-foreground shadow-none ring-0 transition-transform duration-100',
					'translate-x-0.5',
					'data-checked:translate-x-4 data-checked:bg-background data-checked:border-transparent',
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
