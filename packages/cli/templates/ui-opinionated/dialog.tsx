import type { Dialog as DialogPrimitiveBase } from '@base-ui/react/dialog'
import type * as React from 'react'

import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	Dialog as DialogPrimitive,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export interface DialogProps extends DialogPrimitiveBase.Root.Props {
	trigger?: React.ReactNode
	title?: React.ReactNode
	description?: React.ReactNode
	footer?: React.ReactNode
	showCloseButton?: boolean
	contentClassName?: string
	children?: React.ReactNode
}

function Dialog({
	trigger,
	title,
	description,
	footer,
	showCloseButton = true,
	contentClassName,
	children,
	...dialogProps
}: DialogProps) {
	// Opinionated API: trigger + title + description + content + footer
	if (trigger || title) {
		return (
			<DialogPrimitive {...dialogProps}>
				{trigger && <DialogTrigger>{trigger}</DialogTrigger>}
				<DialogContent showCloseButton={showCloseButton} className={contentClassName}>
					{(title || description) && (
						<DialogHeader>
							{title && <DialogTitle>{title}</DialogTitle>}
							{description && <DialogDescription>{description}</DialogDescription>}
						</DialogHeader>
					)}
					{children}
					{footer && <DialogFooter>{footer}</DialogFooter>}
				</DialogContent>
			</DialogPrimitive>
		)
	}

	// Fallback: children-based composition
	return <DialogPrimitive {...dialogProps}>{children}</DialogPrimitive>
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
}
