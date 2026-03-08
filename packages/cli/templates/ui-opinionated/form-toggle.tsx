import type * as React from 'react'

import { Toggle, toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

export interface FormToggleProps {
	label?: string
	description?: string
	className?: string
	children: React.ReactNode
}

function FormToggle({ label, description, className, children }: FormToggleProps) {
	return (
		<div data-slot="form-toggle" className={cn('flex flex-col gap-1', className)}>
			{label && (
				<span className="text-xs font-medium uppercase tracking-wider">{label}</span>
			)}
			{children}
			{description && (
				<p className="text-xs/relaxed text-muted-foreground">{description}</p>
			)}
		</div>
	)
}

export { FormToggle, Toggle, toggleVariants }
