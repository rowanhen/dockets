import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.ComponentProps<'span'> {
	src?: string
	alt?: string
	fallback?: React.ReactNode
	size?: 'sm' | 'default' | 'lg'
}

const sizeClasses = {
	sm: 'size-7 text-[10px]',
	default: 'size-9 text-xs',
	lg: 'size-12 text-sm',
}

function Avatar({ className, src, alt, fallback, size = 'default', ...props }: AvatarProps) {
	const [imgError, setImgError] = React.useState(false)
	const showFallback = !src || imgError

	return (
		<span
			data-slot="avatar"
			className={cn(
				'relative inline-flex shrink-0 overflow-hidden rounded-none border-[length:var(--border-width)] border-dashed border-foreground',
				sizeClasses[size],
				className,
			)}
			{...props}
		>
			{!showFallback && (
				<img
					src={src}
					alt={alt ?? ''}
					className="h-full w-full object-cover"
					onError={() => setImgError(true)}
				/>
			)}
			{showFallback && (
				<span
					data-slot="avatar-fallback"
					className="flex h-full w-full items-center justify-center bg-muted font-medium uppercase tracking-wider text-muted-foreground"
				>
					{fallback}
				</span>
			)}
		</span>
	)
}

function AvatarImage({ className, ...props }: React.ComponentProps<'img'>) {
	return (
		<img
			data-slot="avatar-image"
			className={cn('h-full w-full object-cover', className)}
			{...props}
		/>
	)
}

function AvatarFallback({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="avatar-fallback"
			className={cn(
				'flex h-full w-full items-center justify-center bg-muted font-medium uppercase tracking-wider text-muted-foreground',
				className,
			)}
			{...props}
		/>
	)
}

export { Avatar, AvatarImage, AvatarFallback }
