'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

type SheetSide = 'top' | 'bottom' | 'left' | 'right'

function Sheet({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="sheet-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/20 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
				className,
			)}
			{...props}
		/>
	)
}

const sheetSideClasses: Record<SheetSide, string> = {
	top: 'inset-x-0 top-0 border-b-[length:var(--border-width)] data-open:slide-in-from-top data-closed:slide-out-to-top',
	bottom: 'inset-x-0 bottom-0 border-t-[length:var(--border-width)] data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
	left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r-[length:var(--border-width)] data-open:slide-in-from-left data-closed:slide-out-to-left',
	right: 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l-[length:var(--border-width)] data-open:slide-in-from-right data-closed:slide-out-to-right',
}

function SheetContent({
	side = 'right',
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	side?: SheetSide
	showCloseButton?: boolean
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<DialogPrimitive.Popup
				data-slot="sheet-content"
				className={cn(
					'fixed z-50 flex flex-col gap-4 rounded-[var(--radius)] border-foreground bg-card p-6 text-xs/relaxed text-card-foreground duration-200 outline-none data-open:animate-in data-closed:animate-out',
					sheetSideClasses[side],
					className,
				)}
				{...props}
			>
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="sheet-close"
						className="absolute top-4 right-4 flex size-6 items-center justify-center text-muted-foreground hover:text-foreground"
						aria-label="Close"
					>
						<XIcon className="size-4" />
					</DialogPrimitive.Close>
				)}
				{children}
			</DialogPrimitive.Popup>
		</SheetPortal>
	)
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
			{...props}
		/>
	)
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="sheet-title"
			className={cn('text-sm font-medium uppercase tracking-wider', className)}
			{...props}
		/>
	)
}

function SheetDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-xs/relaxed text-muted-foreground', className)}
			{...props}
		/>
	)
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetPortal,
	SheetOverlay,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
}
