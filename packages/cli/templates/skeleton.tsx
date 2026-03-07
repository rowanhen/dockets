import * as React from 'react'
import { Skeleton, SkeletonText } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface SkeletonCardProps {
	className?: string
	lines?: number
	showAvatar?: boolean
}

function SkeletonCard({ className, lines = 3, showAvatar = false }: SkeletonCardProps) {
	return (
		<div
			className={cn(
				'rounded-none border-[length:var(--border-width)] border-foreground p-4',
				className,
			)}
		>
			{showAvatar && (
				<div className="mb-3 flex items-center gap-2">
					<Skeleton className="size-9 rounded-none" />
					<div className="flex flex-col gap-1.5">
						<Skeleton className="h-3 w-24" />
						<Skeleton className="h-3 w-16" />
					</div>
				</div>
			)}
			<SkeletonText lines={lines} />
		</div>
	)
}

export { SkeletonCard, Skeleton, SkeletonText }
