import type { Menu as MenuPrimitiveBase } from '@base-ui/react/menu'
import type * as React from 'react'

import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenu as DropdownMenuPrimitive,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface DropdownMenuItemData {
	label: React.ReactNode
	onClick?: () => void
	icon?: React.ReactNode
	variant?: 'default' | 'destructive'
	disabled?: boolean
	separator?: false
}

export interface DropdownMenuSeparatorData {
	separator: true
}

export type DropdownMenuEntry = DropdownMenuItemData | DropdownMenuSeparatorData

export interface DropdownMenuProps {
	trigger: React.ReactNode
	items?: DropdownMenuEntry[]
	align?: 'start' | 'center' | 'end'
	side?: 'top' | 'bottom' | 'left' | 'right'
	contentClassName?: string
	children?: React.ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

function DropdownMenu({
	trigger,
	items,
	align = 'start',
	side = 'bottom',
	contentClassName,
	children,
	open,
	onOpenChange,
}: DropdownMenuProps) {
	const rootProps: MenuPrimitiveBase.Root.Props = {}
	if (open !== undefined) rootProps.open = open
	if (onOpenChange !== undefined) rootProps.onOpenChange = onOpenChange

	if (items) {
		return (
			<DropdownMenuPrimitive {...rootProps}>
				<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
				<DropdownMenuContent align={align} side={side} className={contentClassName}>
					{items.map((entry, i) => {
						if (entry.separator) {
							return <DropdownMenuSeparator key={`sep-${i}`} />
						}
						return (
							<DropdownMenuItem
								key={`item-${i}`}
								onSelect={entry.onClick}
								variant={entry.variant}
								disabled={entry.disabled}
							>
								{entry.icon}
								{entry.label}
							</DropdownMenuItem>
						)
					})}
				</DropdownMenuContent>
			</DropdownMenuPrimitive>
		)
	}

	return (
		<DropdownMenuPrimitive {...rootProps}>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent align={align} side={side} className={contentClassName}>
				{children}
			</DropdownMenuContent>
		</DropdownMenuPrimitive>
	)
}

// Re-export sub-components for advanced use
export {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
}
