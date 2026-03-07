'use client'

// Sidebar layout primitives.
// Implements a collapsible rail sidebar with "borders never stack" applied:
//  - Sidebar has border-r-[length:var(--border-width)] (no left border — page edge is implied)
//  - Content fills remaining space with no left border (avoids double border with sidebar)

import * as React from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarContextValue {
	open: boolean
	setOpen: (v: boolean) => void
	toggleOpen: () => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
	open: true,
	setOpen: () => {},
	toggleOpen: () => {},
})

function useSidebar() {
	return React.useContext(SidebarContext)
}

interface SidebarProviderProps extends React.ComponentProps<'div'> {
	defaultOpen?: boolean
}

function SidebarProvider({
	defaultOpen = true,
	className,
	children,
	...props
}: SidebarProviderProps) {
	const [open, setOpen] = React.useState(defaultOpen)
	const toggleOpen = () => setOpen((v) => !v)
	return (
		<SidebarContext.Provider value={{ open, setOpen, toggleOpen }}>
			<div
				data-slot="sidebar-provider"
				data-sidebar-open={open}
				className={cn('flex h-full w-full', className)}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	)
}

function Sidebar({ className, children, ...props }: React.ComponentProps<'aside'>) {
	const { open } = useSidebar()
	return (
		<aside
			data-slot="sidebar"
			data-open={open}
			className={cn(
				'relative flex flex-col border-r-[length:var(--border-width)] border-foreground bg-card text-card-foreground transition-[width] duration-200',
				open ? 'w-60' : 'w-12',
				className,
			)}
			{...props}
		>
			{children}
		</aside>
	)
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sidebar-header"
			className={cn(
				'flex items-center border-b-[length:var(--border-width)] border-foreground px-3 py-2',
				className,
			)}
			{...props}
		/>
	)
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sidebar-content"
			className={cn('flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-2', className)}
			{...props}
		/>
	)
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sidebar-footer"
			className={cn(
				'flex items-center border-t-[length:var(--border-width)] border-foreground px-3 py-2',
				className,
			)}
			{...props}
		/>
	)
}

function SidebarNav({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			data-slot="sidebar-nav"
			className={cn('flex flex-col gap-0 px-1', className)}
			{...props}
		/>
	)
}

function SidebarNavItem({ className, active, ...props }: React.ComponentProps<'a'> & { active?: boolean }) {
	const { open } = useSidebar()
	return (
		<a
			data-slot="sidebar-nav-item"
			data-active={active}
			className={cn(
				'flex min-h-9 items-center gap-2 rounded-none px-2 text-xs font-medium uppercase tracking-wider transition-colors',
				'hover:bg-accent hover:text-accent-foreground',
				active && 'bg-foreground text-background',
				!open && 'justify-center px-0',
				className,
			)}
			{...props}
		/>
	)
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sidebar-group"
			className={cn('py-2', className)}
			{...props}
		/>
	)
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
	const { open } = useSidebar()
	return (
		<div
			data-slot="sidebar-group-label"
			className={cn(
				'px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground',
				!open && 'sr-only',
				className,
			)}
			{...props}
		/>
	)
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<'button'>) {
	const { toggleOpen } = useSidebar()
	return (
		<button
			type="button"
			data-slot="sidebar-trigger"
			onClick={toggleOpen}
			className={cn(
				'flex size-8 items-center justify-center rounded-none text-muted-foreground hover:text-foreground',
				className,
			)}
			aria-label="Toggle sidebar"
			{...props}
		>
			<PanelLeftIcon className="size-4" />
		</button>
	)
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn('flex flex-1 flex-col overflow-hidden', className)}
			{...props}
		/>
	)
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
	const { toggleOpen } = useSidebar()
	return (
		<button
			type="button"
			data-slot="sidebar-rail"
			onClick={toggleOpen}
			aria-label="Toggle sidebar"
			tabIndex={-1}
			className={cn(
				'absolute inset-y-0 right-0 z-20 hidden w-1 cursor-col-resize hover:bg-foreground/10 sm:flex',
				className,
			)}
			{...props}
		/>
	)
}

export {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarNav,
	SidebarNavItem,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarTrigger,
	SidebarInset,
	SidebarRail,
	useSidebar,
}
