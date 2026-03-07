'use client'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { XIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'peer flex size-4 shrink-0 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'data-checked:bg-foreground data-checked:border-foreground data-checked:text-background',
				'data-indeterminate:bg-foreground data-indeterminate:border-foreground data-indeterminate:text-background',
				'focus-ring',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className="flex items-center justify-center">
				{/* indeterminate */}
				<MinusIcon className="hidden size-3 data-indeterminate:block" />
				{/* checked */}
				<XIcon className="size-3 data-indeterminate:hidden" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
