import type * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ListItem } from '@/components/ui/list-item'

/* ─── Item data types ─── */

export interface ListItemData {
	content: React.ReactNode
}

/* ─── Variant definitions ─── */

type ListVariant = 'arrow' | 'check' | 'check-bordered' | 'bullet'

/* ─── Props ─── */

export interface ListProps {
	items?: ListItemData[]
	variant?: ListVariant
	className?: string
	children?: React.ReactNode
}

/* ─── Item renderers ─── */

function ArrowItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<span className="text-klein text-sm">→</span>
			<span className="text-muted-foreground">{content}</span>
		</li>
	)
}

function CheckItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<Check className="w-4 h-4 text-klein flex-shrink-0 mt-1" aria-hidden="true" />
			<span className="text-muted-foreground text-sm">{content}</span>
		</li>
	)
}

function CheckBorderedItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3 border p-4">
			<Check className="w-5 h-5 text-klein flex-shrink-0 mt-0.5" aria-hidden="true" />
			<span className="text-sm">{content}</span>
		</li>
	)
}

function BulletItem({ content }: ListItemData) {
	return <li>{content}</li>
}

const VARIANT_ITEM: Record<ListVariant, React.FC<ListItemData>> = {
	arrow: ArrowItem,
	check: CheckItem,
	'check-bordered': CheckBorderedItem,
	bullet: BulletItem,
}

const VARIANT_UL_CLASS: Record<ListVariant, string> = {
	arrow: 'space-y-4',
	check: 'space-y-3',
	'check-bordered': 'grid md:grid-cols-2 gap-4',
	bullet: 'list-disc list-inside space-y-1',
}

/* ─── Component ─── */

function List({ items, variant = 'bullet', className, children }: ListProps) {
	if (items) {
		const ItemComponent = VARIANT_ITEM[variant]
		return (
			<ul className={cn(VARIANT_UL_CLASS[variant], className)}>
				{items.map((item, i) => (
					<ItemComponent key={i} content={item.content} />
				))}
			</ul>
		)
	}

	return <ul className={cn(className)}>{children}</ul>
}

export { List, ListItem }
