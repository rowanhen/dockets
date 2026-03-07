'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Menubar({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="menubar"
			role="menubar"
			className={cn(
				'flex h-9 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-card text-card-foreground',
				className,
			)}
			{...props}
		/>
	)
}

function MenubarMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />
}

function MenubarTrigger({ className, children, ...props }: MenuPrimitive.Trigger.Props) {
	return (
		<MenuPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cn(
				'flex h-full cursor-default items-center gap-1 px-3 text-xs font-medium uppercase tracking-wider select-none',
				'hover:bg-accent hover:text-accent-foreground',
				'data-popup-open:bg-foreground data-popup-open:text-background',
				'focus-visible:outline-none focus-visible:bg-accent',
				'disabled:pointer-events-none disabled:opacity-50',
				// No stacking: each menu trigger gets right border except last
				'[&:not(:last-child)]:border-r-[length:var(--border-width)] [&:not(:last-child)]:border-foreground',
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="size-3 text-muted-foreground" />
		</MenuPrimitive.Trigger>
	)
}

function MenubarContent({
	className,
	align = 'start',
	sideOffset = 2,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<MenuPrimitive.Positioner.Props, 'align' | 'sideOffset'>) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				align={align}
				sideOffset={sideOffset}
				className="isolate z-50 outline-none"
			>
				<MenuPrimitive.Popup
					data-slot="menubar-content"
					className={cn(
						'z-50 min-w-40 origin-(--transform-origin) overflow-hidden rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-popover text-popover-foreground shadow-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

function MenubarItem({
	className,
	inset,
	variant = 'default',
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean
	variant?: 'default' | 'destructive'
}) {
	return (
		<MenuPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] px-2 py-1.5 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	)
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] py-1.5 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute right-2 flex items-center justify-center">
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon className="size-3" />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	)
}

function MenubarRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] py-1.5 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute right-2 flex items-center justify-center">
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon className="size-3" />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	)
}

function MenubarLabel({ className, inset, ...props }: React.ComponentProps<'div'> & { inset?: boolean }) {
	return (
		<div
			data-slot="menubar-label"
			data-inset={inset}
			className={cn('px-2 py-1.5 text-xs text-muted-foreground data-inset:pl-7', className)}
			{...props}
		/>
	)
}

function MenubarSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="menubar-separator"
			className={cn('-mx-1 h-[length:var(--border-width)] bg-border', className)}
			{...props}
		/>
	)
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
			{...props}
		/>
	)
}

function MenubarSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({ className, children, inset, ...props }: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"flex cursor-default items-center gap-2 rounded-[var(--radius)] px-2 py-1.5 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	)
}

function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarContent>) {
	return (
		<MenubarContent
			data-slot="menubar-sub-content"
			className={cn('w-auto min-w-[96px]', className)}
			{...props}
		/>
	)
}

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarLabel,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
}
