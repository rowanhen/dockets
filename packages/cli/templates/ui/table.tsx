import * as React from 'react'
import { cn } from '@/lib/utils'

// Receipt-style data table.
// "Borders never stack" rule applied:
//  - Table has border-[length:var(--border-width)] (outer frame)
//  - <tr> cells use border-b-[length:var(--border-width)] except last row
//  - <td>/<th> use border-r-[length:var(--border-width)] except last column
//  No cell has a top or left border — the outer frame + sibling borders handle it.

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot="table-wrapper"
			className="relative w-full overflow-x-auto rounded-none border-[length:var(--border-width)] border-foreground"
		>
			<table
				data-slot="table"
				className={cn('w-full caption-bottom border-collapse text-xs', className)}
				{...props}
			/>
		</div>
	)
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot="table-header"
			className={cn('bg-card', className)}
			{...props}
		/>
	)
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr:last-child]:border-0', className)}
			{...props}
		/>
	)
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'border-t-[length:var(--border-width)] border-foreground bg-card font-medium',
				className,
			)}
			{...props}
		/>
	)
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				// Row separator: border-b, except last row (handled by TableBody [last-child]:border-0)
				'border-b-[length:var(--border-width)] border-foreground/30 transition-colors hover:bg-accent/50 data-selected:bg-accent',
				className,
			)}
			{...props}
		/>
	)
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'h-9 px-3 text-left align-middle text-[10px] font-medium uppercase tracking-wider text-muted-foreground',
				// Column separator: right border except last column
				'[&:not(:last-child)]:border-r-[length:var(--border-width)] [&:not(:last-child)]:border-foreground/30',
				'border-b-[length:var(--border-width)] border-foreground',
				className,
			)}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				'px-3 py-2 align-middle text-xs/relaxed',
				// Column separator: right border except last column
				'[&:not(:last-child)]:border-r-[length:var(--border-width)] [&:not(:last-child)]:border-foreground/20',
				className,
			)}
			{...props}
		/>
	)
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn('mt-2 text-xs text-muted-foreground', className)}
			{...props}
		/>
	)
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
