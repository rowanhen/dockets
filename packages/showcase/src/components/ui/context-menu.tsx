'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

function ContextMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
}

function ContextMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
	return <MenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

function ContextMenuContent({
	className,
	side = 'bottom',
	align = 'start',
	sideOffset = 4,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<MenuPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				side={side}
				align={align}
				sideOffset={sideOffset}
				className="isolate z-50 outline-none"
			>
				<MenuPrimitive.Popup
					data-slot="context-menu-content"
					className={cn(
						'z-50 min-w-32 origin-(--transform-origin) overflow-hidden rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-popover text-popover-foreground shadow-none duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

function ContextMenuItem({
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
			data-slot="context-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] px-2 py-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	)
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] py-2 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

function ContextMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return <MenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
}

function ContextMenuRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-[var(--radius)] py-2 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

function ContextMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<'div'> & { inset?: boolean }) {
	return (
		<div
			data-slot="context-menu-label"
			data-inset={inset}
			className={cn('px-2 py-2 text-xs text-muted-foreground data-inset:pl-7', className)}
			{...props}
		/>
	)
}

function ContextMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn('-mx-1 h-[length:var(--border-width)] bg-border', className)}
			{...props}
		/>
	)
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
			{...props}
		/>
	)
}

function ContextMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"flex cursor-default items-center gap-2 rounded-[var(--radius)] px-2 py-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	)
}

function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuContent>) {
	return (
		<ContextMenuContent
			data-slot="context-menu-sub-content"
			className={cn('w-auto min-w-[96px]', className)}
			{...props}
		/>
	)
}

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuPortal,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubTrigger,
	ContextMenuSubContent,
}
