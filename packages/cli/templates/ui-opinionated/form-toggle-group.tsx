import type * as React from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

export interface FormToggleGroupProps {
	label?: string
	description?: string
	className?: string
	children: React.ReactNode
}

function FormToggleGroup({ label, description, className, children }: FormToggleGroupProps) {
	return (
		<div data-slot="form-toggle-group" className={cn('flex flex-col gap-1', className)}>
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

export { FormToggleGroup, ToggleGroup, ToggleGroupItem }
