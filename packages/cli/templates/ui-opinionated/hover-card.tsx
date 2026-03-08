import type { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'
import type * as React from 'react'

import {
	HoverCardContent,
	HoverCard as HoverCardPrimitive,
	HoverCardTrigger,
} from '@/components/ui/hover-card'

export interface HoverCardProps extends PreviewCardPrimitive.Root.Props {
	trigger: React.ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
	contentClassName?: string
	children: React.ReactNode
}

function HoverCard({
	trigger,
	side = 'bottom',
	align = 'center',
	contentClassName,
	children,
	...rootProps
}: HoverCardProps) {
	return (
		<HoverCardPrimitive {...rootProps}>
			<HoverCardTrigger>{trigger}</HoverCardTrigger>
			<HoverCardContent side={side} align={align} className={contentClassName}>
				{children}
			</HoverCardContent>
		</HoverCardPrimitive>
	)
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
