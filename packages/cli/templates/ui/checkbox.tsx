'use client'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'peer flex size-4 shrink-0 items-center justify-center rounded-none border-[length:var(--border-width)] border-foreground bg-transparent transition-colors',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'data-checked:bg-foreground data-checked:border-foreground data-checked:text-background',
				'data-indeterminate:bg-foreground data-indeterminate:border-foreground data-indeterminate:text-background',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className="flex items-center justify-center">
				{/* indeterminate */}
				<MinusIcon className="hidden size-3 data-indeterminate:block" />
				{/* checked */}
				<CheckIcon className="size-3 data-indeterminate:hidden" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
