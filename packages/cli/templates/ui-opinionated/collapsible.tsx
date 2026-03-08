import * as React from 'react'
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

export interface CollapsibleSectionProps {
	title: string
	defaultOpen?: boolean
	children: React.ReactNode
	className?: string
}

function CollapsibleSection({
	title,
	defaultOpen = false,
	children,
	className,
}: CollapsibleSectionProps) {
	return (
		<Collapsible
			defaultOpen={defaultOpen}
			className={cn('rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground px-3', className)}
		>
			<CollapsibleTrigger className="py-2">{title}</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="pb-3">{children}</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export { CollapsibleSection, Collapsible, CollapsibleTrigger, CollapsibleContent }
