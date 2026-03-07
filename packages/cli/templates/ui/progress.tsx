'use client'

import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Progress({
	className,
	value,
	max = 100,
	...props
}: ProgressPrimitive.Root.Props) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			value={value}
			max={max}
			className={cn(
				'relative h-2 w-full overflow-hidden rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent',
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Track
				data-slot="progress-track"
				className="relative h-full w-full overflow-hidden bg-muted"
			>
				<ProgressPrimitive.Indicator
					data-slot="progress-indicator"
					className="h-full w-[var(--progress-value)] bg-foreground transition-[width] duration-300"
				/>
			</ProgressPrimitive.Track>
		</ProgressPrimitive.Root>
	)
}

export { Progress }
