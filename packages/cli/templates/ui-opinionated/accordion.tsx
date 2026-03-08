import type { Accordion as AccordionPrimitiveBase } from '@base-ui/react/accordion'
import type * as React from 'react'

import {
	AccordionContent,
	AccordionItem,
	Accordion as AccordionPrimitive,
	AccordionTrigger,
} from '@/components/ui/accordion'

export interface AccordionItemData {
	value: string
	trigger: React.ReactNode
	content: React.ReactNode
}

export interface AccordionProps extends Omit<AccordionPrimitiveBase.Root.Props, 'children'> {
	className?: string
	items?: AccordionItemData[]
	children?: React.ReactNode
}

function Accordion({
	className,
	items,
	children,
	defaultValue,
	multiple = true,
	...accordionProps
}: AccordionProps) {
	if (items) {
		// Default all items to open unless defaultValue is explicitly provided
		const computedDefaultValue = defaultValue ?? items.map((item) => item.value)

		return (
			<AccordionPrimitive
				className={className}
				defaultValue={computedDefaultValue}
				multiple={multiple}
				{...accordionProps}
			>
				{items.map((item) => (
					<AccordionItem key={item.value} value={item.value}>
						<AccordionTrigger>{item.trigger}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</AccordionPrimitive>
		)
	}

	if (children) {
		return (
			<AccordionPrimitive
				className={className}
				defaultValue={defaultValue}
				multiple={multiple}
				{...accordionProps}
			>
				{children}
			</AccordionPrimitive>
		)
	}

	return (
		<AccordionPrimitive
			className={className}
			defaultValue={defaultValue}
			multiple={multiple}
			{...accordionProps}
		>
			{null}
		</AccordionPrimitive>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
