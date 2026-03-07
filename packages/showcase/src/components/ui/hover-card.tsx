'use client'

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'
import { cn } from '@/lib/utils'

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
	return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
	return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({
	className,
	side = 'bottom',
	sideOffset = 6,
	align = 'center',
	...props
}: PreviewCardPrimitive.Popup.Props &
	Pick<PreviewCardPrimitive.Positioner.Props, 'side' | 'sideOffset' | 'align'>) {
	return (
		<PreviewCardPrimitive.Portal>
			<PreviewCardPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				className="isolate z-50"
			>
				<PreviewCardPrimitive.Popup
					data-slot="hover-card-content"
					className={cn(
						'z-50 w-64 origin-(--transform-origin) rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground bg-popover p-3 text-xs/relaxed text-popover-foreground shadow-none duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
						className,
					)}
					{...props}
				/>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	)
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
