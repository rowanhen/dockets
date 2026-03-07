'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

function Drawer({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="drawer-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/20 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
				className,
			)}
			{...props}
		/>
	)
}

const sideClasses: Record<DrawerSide, string> = {
	left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r-[length:var(--border-width)] data-open:slide-in-from-left data-closed:slide-out-to-left',
	right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l-[length:var(--border-width)] data-open:slide-in-from-right data-closed:slide-out-to-right',
	top: 'inset-x-0 top-0 w-full border-b-[length:var(--border-width)] data-open:slide-in-from-top data-closed:slide-out-to-top',
	bottom: 'inset-x-0 bottom-0 w-full border-t-[length:var(--border-width)] data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
}

function DrawerContent({
	className,
	children,
	side = 'right',
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	side?: DrawerSide
	showCloseButton?: boolean
}) {
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DialogPrimitive.Popup
				data-slot="drawer-content"
				className={cn(
					'fixed z-50 flex flex-col gap-4 rounded-[var(--radius)] border-foreground bg-card p-4 text-xs/relaxed text-card-foreground duration-200 outline-none data-open:animate-in data-closed:animate-out data-closed:duration-200',
					sideClasses[side],
					className,
				)}
				{...props}
			>
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="drawer-close"
						className="absolute top-3 right-3 flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
						aria-label="Close drawer"
					>
						<XIcon className="size-4" />
					</DialogPrimitive.Close>
				)}
				{children}
			</DialogPrimitive.Popup>
		</DrawerPortal>
	)
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="drawer-header"
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn('mt-auto flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

function DrawerTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="drawer-title"
			className={cn('text-sm font-medium uppercase tracking-wider', className)}
			{...props}
		/>
	)
}

function DrawerDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="drawer-description"
			className={cn('text-xs/relaxed text-muted-foreground', className)}
			{...props}
		/>
	)
}

export {
	Drawer,
	DrawerTrigger,
	DrawerClose,
	DrawerPortal,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
}
