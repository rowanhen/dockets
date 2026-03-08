import type { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import type * as React from 'react'

import {
	PopoverArrow,
	PopoverClose,
	PopoverContent,
	PopoverPortal,
	Popover as PopoverRoot,
	PopoverTrigger,
} from '@/components/ui/popover'

export interface PopoverProps extends PopoverPrimitive.Root.Props {
	trigger: React.ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
	showCloseButton?: boolean
	contentClassName?: string
	children: React.ReactNode
}

function Popover({
	trigger,
	side = 'bottom',
	align = 'center',
	showCloseButton = false,
	contentClassName,
	children,
	...rootProps
}: PopoverProps) {
	return (
		<PopoverRoot {...rootProps}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent
				side={side}
				align={align}
				showCloseButton={showCloseButton}
				className={contentClassName}
			>
				{children}
			</PopoverContent>
		</PopoverRoot>
	)
}

export {
	Popover,
	PopoverTrigger,
	PopoverPortal,
	PopoverClose,
	PopoverContent,
	PopoverArrow,
}
