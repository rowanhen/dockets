'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { XIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
	return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
	return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

function PopoverContent({
	className,
	side = 'bottom',
	sideOffset = 6,
	align = 'center',
	showCloseButton = false,
	children,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<PopoverPrimitive.Positioner.Props, 'side' | 'sideOffset' | 'align'> & {
		showCloseButton?: boolean
	}) {
	return (
		<PopoverPortal>
			<PopoverPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				className="isolate z-50"
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						'relative z-50 w-72 origin-(--transform-origin) rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-popover p-4 text-xs/relaxed text-popover-foreground shadow-none duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
						className,
					)}
					{...props}
				>
					{children}
					{showCloseButton && (
						<PopoverPrimitive.Close
							className="absolute top-2 right-2 flex size-6 items-center justify-center text-muted-foreground hover:text-foreground"
							aria-label="Close"
						>
							<XIcon className="size-3.5" />
						</PopoverPrimitive.Close>
					)}
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPortal>
	)
}

function PopoverArrow({ className, ...props }: PopoverPrimitive.Arrow.Props) {
	return (
		<PopoverPrimitive.Arrow
			data-slot="popover-arrow"
			className={cn('fill-foreground', className)}
			{...props}
		/>
	)
}

export { Popover, PopoverTrigger, PopoverPortal, PopoverClose, PopoverContent, PopoverArrow }
