import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function NavigationMenu({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			data-slot="navigation-menu"
			className={cn('relative flex items-center', className)}
			{...props}
		/>
	)
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="navigation-menu-list"
			className={cn('flex items-center gap-0 list-none', className)}
			{...props}
		/>
	)
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="navigation-menu-item"
			className={cn('relative', className)}
			{...props}
		/>
	)
}

const navigationMenuTriggerStyle = cn(
	'group inline-flex h-9 items-center justify-center gap-1 rounded-[var(--radius)] px-3 py-2 text-xs font-medium uppercase tracking-wider hover:bg-accent hover:text-accent-foreground focus-ring disabled:pointer-events-none disabled:opacity-50',
)

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<'button'>) {
	return (
		<button
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle, 'cursor-default', className)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="size-3 transition-transform duration-200 group-data-open:rotate-180" />
		</button>
	)
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="navigation-menu-content"
			className={cn(
				'absolute top-full left-0 z-50 w-auto min-w-48 rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-popover p-2 text-popover-foreground shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<'a'>) {
	return (
		<a
			data-slot="navigation-menu-link"
			className={cn(
				'block select-none rounded-[var(--radius)] px-3 py-2 text-xs leading-none hover:bg-accent hover:text-accent-foreground focus-ring',
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuViewport({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="navigation-menu-viewport"
			className={cn('absolute top-full left-0 z-50 mt-1', className)}
			{...props}
		/>
	)
}

function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="navigation-menu-indicator"
			className={cn(
				'top-full z-[1] flex h-[length:var(--border-width)] items-end justify-center overflow-hidden',
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 bg-foreground" />
		</div>
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
