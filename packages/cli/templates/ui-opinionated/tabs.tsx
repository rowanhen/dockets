import type { Tabs as TabsPrimitiveBase } from '@base-ui/react/tabs'
import type * as React from 'react'

import {
	TabsContent,
	TabsList,
	Tabs as TabsPrimitive,
	TabsTrigger,
	tabsListVariants,
} from '@/components/ui/tabs'

export interface TabItemData {
	value: string
	label: React.ReactNode
	content: React.ReactNode
	disabled?: boolean
}

export interface TabsProps extends Omit<TabsPrimitiveBase.Root.Props, 'children'> {
	items?: TabItemData[]
	variant?: 'default' | 'line'
	className?: string
	listClassName?: string
	children?: React.ReactNode
}

function Tabs({
	items,
	variant = 'default',
	className,
	listClassName,
	children,
	...tabsProps
}: TabsProps) {
	if (items) {
		return (
			<TabsPrimitive className={className} {...tabsProps}>
				<TabsList variant={variant} className={listClassName}>
					{items.map((item) => (
						<TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>
				{items.map((item) => (
					<TabsContent key={item.value} value={item.value}>
						{item.content}
					</TabsContent>
				))}
			</TabsPrimitive>
		)
	}

	return (
		<TabsPrimitive className={className} {...tabsProps}>
			{children}
		</TabsPrimitive>
	)
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
