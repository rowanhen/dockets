import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			data-slot="pagination"
			role="navigation"
			aria-label="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex items-center gap-0 list-none', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
	disabled?: boolean
} & React.ComponentProps<'a'>

function PaginationLink({ className, isActive, disabled, ...props }: PaginationLinkProps) {
	return (
		<a
			data-slot="pagination-link"
			aria-current={isActive ? 'page' : undefined}
			aria-disabled={disabled}
			className={cn(
				'flex h-9 min-w-9 items-center justify-center rounded-none border-[length:var(--border-width)] border-foreground text-xs font-medium uppercase tracking-wider transition-colors',
				// No stacking: negative margin collapses adjacent item borders
				'-ml-[length:var(--border-width)] first:ml-0',
				isActive
					? 'z-10 bg-foreground text-background'
					: 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground',
				disabled && 'pointer-events-none opacity-40',
				className,
			)}
			{...props}
		/>
	)
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<'a'>) {
	return (
		<PaginationLink
			data-slot="pagination-previous"
			aria-label="Previous page"
			className={cn('gap-1 px-2.5', className)}
			{...props}
		>
			<ChevronLeftIcon className="size-3.5" />
			<span className="sr-only sm:not-sr-only">Prev</span>
		</PaginationLink>
	)
}

function PaginationNext({ className, ...props }: React.ComponentProps<'a'>) {
	return (
		<PaginationLink
			data-slot="pagination-next"
			aria-label="Next page"
			className={cn('gap-1 px-2.5', className)}
			{...props}
		>
			<span className="sr-only sm:not-sr-only">Next</span>
			<ChevronRightIcon className="size-3.5" />
		</PaginationLink>
	)
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="pagination-ellipsis"
			aria-hidden
			className={cn(
				'flex h-9 w-9 items-center justify-center rounded-none border-[length:var(--border-width)] border-dashed border-foreground -ml-[length:var(--border-width)] first:ml-0 text-muted-foreground',
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon className="size-3.5" />
			<span className="sr-only">More pages</span>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
}
