// ─── Layout Primitives ────────────────────────────────────────────────────────
//
// These components enforce the dockets spacing and border system:
//
// BORDERS NEVER STACK RULES:
//   • Stack/Row gaps use margin (not padding) so items never double-border
//   • BentoGrid: container holds border-t + border-l.
//     BentoCells add border-b + border-r → each edge drawn exactly once.
//   • Use `border-[length:var(--border-width)]` throughout, never hardcoded 1px.
//
// SPACING:
//   All padding/gap values pull from Tailwind's scale (1=4px, 2=8px, …).
//   Macro layout values come from --space-layout-sm/md/lg defined in dockets.css.

import * as React from 'react'
import { cn } from '@/lib/utils'

// ─── Container ────────────────────────────────────────────────────────────────

interface ContainerProps extends React.ComponentProps<'div'> {
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const containerSizes = {
	sm: 'max-w-2xl',
	md: 'max-w-4xl',
	lg: 'max-w-6xl',
	xl: 'max-w-7xl',
	full: 'max-w-none',
}

function Container({ className, size = 'lg', ...props }: ContainerProps) {
	return (
		<div
			data-slot="container"
			className={cn('mx-auto w-full px-4 sm:px-6', containerSizes[size], className)}
			{...props}
		/>
	)
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface SectionProps extends React.ComponentProps<'section'> {
	spacing?: 'sm' | 'md' | 'lg'
}

const sectionSpacing = {
	sm: 'py-[var(--space-layout-sm)]',
	md: 'py-[var(--space-layout-md)]',
	lg: 'py-[var(--space-layout-lg)]',
}

function Section({ className, spacing = 'md', ...props }: SectionProps) {
	return (
		<section
			data-slot="section"
			className={cn('w-full', sectionSpacing[spacing], className)}
			{...props}
		/>
	)
}

// ─── Stack (vertical flex) ────────────────────────────────────────────────────

interface StackProps extends React.ComponentProps<'div'> {
	gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8
	align?: 'start' | 'center' | 'end' | 'stretch'
}

const stackGaps: Record<number, string> = {
	1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 8: 'gap-8',
}

const alignItems: Record<string, string> = {
	start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch',
}

function Stack({ className, gap = 4, align = 'stretch', ...props }: StackProps) {
	return (
		<div
			data-slot="stack"
			className={cn('flex flex-col', stackGaps[gap], alignItems[align], className)}
			{...props}
		/>
	)
}

// ─── Row (horizontal flex) ────────────────────────────────────────────────────

interface RowProps extends React.ComponentProps<'div'> {
	gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8
	align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
	wrap?: boolean
}

const justifyContent: Record<string, string> = {
	start: 'justify-start', center: 'justify-center', end: 'justify-end',
	between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly',
}

function Row({ className, gap = 4, align = 'center', justify = 'start', wrap = false, ...props }: RowProps) {
	return (
		<div
			data-slot="row"
			className={cn(
				'flex flex-row',
				stackGaps[gap],
				alignItems[align],
				justifyContent[justify],
				wrap && 'flex-wrap',
				className,
			)}
			{...props}
		/>
	)
}

// ─── Spacer ───────────────────────────────────────────────────────────────────

function Spacer({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="spacer"
			className={cn('flex-1', className)}
			aria-hidden
			{...props}
		/>
	)
}

// ─── Divider ──────────────────────────────────────────────────────────────────

interface DividerProps extends React.ComponentProps<'hr'> {
	orientation?: 'horizontal' | 'vertical'
}

function Divider({ className, orientation = 'horizontal', ...props }: DividerProps) {
	return (
		<hr
			data-slot="divider"
			data-orientation={orientation}
			className={cn(
				'border-0 bg-border',
				orientation === 'horizontal'
					? 'h-[length:var(--border-width)] w-full'
					: 'h-full w-[length:var(--border-width)] self-stretch',
				className,
			)}
			{...props}
		/>
	)
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface GridProps extends React.ComponentProps<'div'> {
	cols?: 1 | 2 | 3 | 4 | 6 | 12
	gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8
}

const gridCols: Record<number, string> = {
	1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
	4: 'grid-cols-4', 6: 'grid-cols-6', 12: 'grid-cols-12',
}

function Grid({ className, cols = 2, gap = 4, ...props }: GridProps) {
	return (
		<div
			data-slot="grid"
			className={cn('grid', gridCols[cols], stackGaps[gap], className)}
			{...props}
		/>
	)
}

// ─── BentoGrid ────────────────────────────────────────────────────────────────
//
// Newspaper-grid border pattern:
//   Container: border-t + border-l (outer frame top and left)
//   Cells:     border-b + border-r  (completes each cell, never double)
//
// Result: every cell boundary is a single border line.

interface BentoGridProps extends React.ComponentProps<'div'> {
	cols?: 1 | 2 | 3 | 4
}

const bentoCols: Record<number, string> = {
	1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
}

function BentoGrid({ className, cols = 3, ...props }: BentoGridProps) {
	return (
		<div
			data-slot="bento-grid"
			className={cn(
				'grid',
				bentoCols[cols],
				// Container provides top + left edge; cells fill right + bottom
				'border-t-[length:var(--border-width)] border-l-[length:var(--border-width)] border-foreground',
				className,
			)}
			{...props}
		/>
	)
}

// ─── BentoCell ────────────────────────────────────────────────────────────────

interface BentoCellProps extends React.ComponentProps<'div'> {
	span?: 1 | 2 | 3 | 4
	rowSpan?: 1 | 2 | 3
}

const colSpans: Record<number, string> = {
	1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
}

const rowSpans: Record<number, string> = {
	1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3',
}

function BentoCell({ className, span = 1, rowSpan = 1, ...props }: BentoCellProps) {
	return (
		<div
			data-slot="bento-cell"
			className={cn(
				colSpans[span],
				rowSpans[rowSpan],
				// Cell provides bottom + right edge (newspaper rule — completes grid lines)
				'border-b-[length:var(--border-width)] border-r-[length:var(--border-width)] border-foreground',
				'p-4',
				className,
			)}
			{...props}
		/>
	)
}

export {
	Container,
	Section,
	Stack,
	Row,
	Spacer,
	Divider,
	Grid,
	BentoGrid,
	BentoCell,
}
