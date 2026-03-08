import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import type * as React from 'react'

import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	Sheet as SheetPrimitive,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

export interface SheetProps extends DialogPrimitive.Root.Props {
	trigger?: React.ReactNode
	title?: React.ReactNode
	description?: React.ReactNode
	footer?: React.ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	showCloseButton?: boolean
	contentClassName?: string
	children?: React.ReactNode
}

function Sheet({
	trigger,
	title,
	description,
	footer,
	side = 'right',
	showCloseButton = true,
	contentClassName,
	children,
	...sheetProps
}: SheetProps) {
	if (trigger || title) {
		return (
			<SheetPrimitive {...sheetProps}>
				{trigger && <SheetTrigger>{trigger}</SheetTrigger>}
				<SheetContent side={side} showCloseButton={showCloseButton} className={contentClassName}>
					{(title || description) && (
						<SheetHeader>
							{title && <SheetTitle>{title}</SheetTitle>}
							{description && <SheetDescription>{description}</SheetDescription>}
						</SheetHeader>
					)}
					{children}
					{footer && <SheetFooter>{footer}</SheetFooter>}
				</SheetContent>
			</SheetPrimitive>
		)
	}

	return <SheetPrimitive {...sheetProps}>{children}</SheetPrimitive>
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
