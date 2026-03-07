import * as React from 'react'
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton"
			className={cn('animate-pulse rounded-[var(--radius)] bg-muted', className)}
			{...props}
		/>
	)
}

// Dot-fill pattern variant — matches the dockets receipt aesthetic
function SkeletonText({ lines = 3, className, ...props }: React.ComponentProps<'div'> & { lines?: number }) {
	return (
		<div
			data-slot="skeleton-text"
			className={cn('flex flex-col gap-2', className)}
			{...props}
		>
			{Array.from({ length: lines }, (_, i) => (
				<div
					key={i}
					className={cn(
						'h-3 animate-pulse rounded-[var(--radius)] bg-muted',
						i === lines - 1 && 'w-3/4',
					)}
				/>
			))}
		</div>
	)
}

export { Skeleton, SkeletonText }
