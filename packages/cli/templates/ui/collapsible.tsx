'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			className={cn('rounded-[var(--radius)]', className)}
			{...props}
		/>
	)
}

function CollapsibleTrigger({ className, children, ...props }: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn(
				'group/collapsible-trigger flex w-full items-center justify-between rounded-[var(--radius)] py-2 text-xs font-medium uppercase tracking-wider hover:underline disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-data-open/collapsible-trigger:hidden" />
			<ChevronUpIcon className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-data-open/collapsible-trigger:block" />
		</CollapsiblePrimitive.Trigger>
	)
}

function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel
			data-slot="collapsible-content"
			className={cn(
				'overflow-hidden text-xs/relaxed data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
				className,
			)}
			{...props}
		/>
	)
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
