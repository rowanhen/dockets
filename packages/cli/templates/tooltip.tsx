import type * as React from 'react'

import {
	TooltipContent,
	Tooltip as TooltipPrimitive,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export interface TooltipProps {
	content: React.ReactNode
	children: React.ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
	className?: string
}

function Tooltip({ content, children, side = 'top', align = 'center', className }: TooltipProps) {
	return (
		<TooltipProvider delay={0}>
			<TooltipPrimitive>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align} className={className}>
					{content}
				</TooltipContent>
			</TooltipPrimitive>
		</TooltipProvider>
	)
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
