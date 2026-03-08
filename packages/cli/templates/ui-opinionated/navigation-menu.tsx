import type * as React from 'react'

import {
	NavigationMenu as NavigationMenuRoot,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuViewport,
	NavigationMenuIndicator,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export interface NavLinkItem {
	label: string
	href: string
	className?: string
}

export interface NavGroupItem {
	label: string
	children: React.ReactNode
	className?: string
}

export type NavItem = NavLinkItem | NavGroupItem

function isGroupItem(item: NavItem): item is NavGroupItem {
	return 'children' in item
}

export interface NavigationMenuProps {
	items: NavItem[]
	className?: string
}

function NavigationMenu({ items, className }: NavigationMenuProps) {
	return (
		<NavigationMenuRoot className={className}>
			<NavigationMenuList>
				{items.map((item, i) => (
					<NavigationMenuItem key={i}>
						{isGroupItem(item) ? (
							<>
								<NavigationMenuTrigger className={item.className}>
									{item.label}
								</NavigationMenuTrigger>
								<NavigationMenuContent>{item.children}</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink href={item.href} className={item.className ?? navigationMenuTriggerStyle}>
								{item.label}
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenuRoot>
	)
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuViewport,
	NavigationMenuIndicator,
	navigationMenuTriggerStyle,
}
