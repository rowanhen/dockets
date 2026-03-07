import { cn } from '@/lib/utils'

// ─── DIVIDER ──────────────────────────────────────────────────────────────────

type DividerVariant = 'dots' | 'dashes' | 'equals'

export function Divider({
	variant = 'dots',
	className,
}: {
	variant?: DividerVariant
	className?: string
}) {
	const chars: Record<DividerVariant, string> = {
		dots: '.'.repeat(200),
		dashes: '-'.repeat(200),
		equals: '='.repeat(200),
	}
	return (
		<div className={cn('text-xs my-2 h-[1em] w-full relative overflow-hidden', className)}>
			<span className="absolute inset-x-0 whitespace-nowrap tracking-[-1px] text-[var(--border-color)] select-none">
				{chars[variant]}
			</span>
		</div>
	)
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

export function SectionLabel({
	children,
	variant = 'default',
	className,
}: {
	children: React.ReactNode
	variant?: 'default' | 'bordered'
	className?: string
}) {
	return (
		<div
			className={cn(
				'text-xs font-bold uppercase py-[3px] px-2 border-t border-b',
				variant === 'default'
					? 'bg-[var(--border-color)] text-[var(--receipt-bg)]'
					: 'bg-transparent text-[var(--text-color)]',
				className,
			)}
		>
			{children}
		</div>
	)
}

// ─── ROW ──────────────────────────────────────────────────────────────────────

export function Row({
	label,
	value,
	fill = false,
	bold = false,
	className,
}: {
	label: string
	value: string
	fill?: boolean
	bold?: boolean
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex items-end text-xs gap-0',
				bold && 'font-bold',
				className,
			)}
		>
			<span className="uppercase shrink-0">{label}</span>
			{fill ? (
				<>
					<span
						aria-hidden
						className="flex-1 min-w-[2ch] overflow-hidden tracking-[-1px] whitespace-nowrap opacity-20 text-[var(--border-color)] select-none"
					>
						{'.'.repeat(200)}
					</span>
					<span className="shrink-0">{value}</span>
				</>
			) : (
				<span className="flex-1 text-right">{value}</span>
			)}
		</div>
	)
}

// ─── DATA TABLE ───────────────────────────────────────────────────────────────
//
// Column widths are in `ch` units (character widths), so columns snap to the
// monospace grid. Omit `width` on a column to have it fill remaining space.
//
// Example:
//   columns={[{ label: 'service', width: 24 }, { label: 'total', align: 'right' }]}

export interface ColDef {
	label: string
	width?: number // ch units
	align?: 'left' | 'right'
}

export function DataTable({
	columns,
	rows,
	className,
}: {
	columns: ColDef[]
	rows: (string | React.ReactNode)[][]
	className?: string
}) {
	return (
		<div className={cn('text-xs', className)}>
			{/* Header row */}
			<div className="flex border-b border-[var(--border-color)] pb-px mb-px">
				{columns.map((col, i) => (
					<span
						key={i}
						className={cn(
							'uppercase shrink-0 text-[var(--muted-color)]',
							!col.width && 'flex-1',
							col.align === 'right' && 'text-right',
						)}
						style={col.width ? { width: `${col.width}ch` } : undefined}
					>
						{col.label}
					</span>
				))}
			</div>
			{/* Data rows */}
			{rows.map((row, ri) => (
				<div
					key={ri}
					className="flex border-b border-[var(--border-subtle)] py-px last:border-b-0"
				>
					{row.map((cell, ci) => {
						const col = columns[ci]
						return (
							<span
								key={ci}
								className={cn(
									'shrink-0',
									!col?.width && 'flex-1',
									col?.align === 'right' && 'text-right',
								)}
								style={col?.width ? { width: `${col.width}ch` } : undefined}
							>
								{cell}
							</span>
						)
					})}
				</div>
			))}
		</div>
	)
}

// ─── GLYPH ────────────────────────────────────────────────────────────────────
//
// Fixed-size square containing a centred character. Size must be a multiple of
// 8 or 16. `--radius-full` is 0 in this theme so the inner circle is set via
// inline style (borderRadius: '50%') rather than a Tailwind class.
//
// Variants:
//   default          bordered square, normal bg
//   filled           inverted (black bg, light text)
//   circle           light bg + filled circle behind character (white text)
//   circle-inverted  black bg + light circle behind character (dark text)

export type GlyphSize = 16 | 24 | 32 | 48 | 64 | 96
export type GlyphVariant = 'default' | 'filled' | 'circle' | 'circle-inverted'

const GLYPH_FONT: Record<GlyphSize, string> = {
	16: 'text-[9px]',
	24: 'text-[11px]',
	32: 'text-xs',
	48: 'text-base',
	64: 'text-xl',
	96: 'text-3xl',
}

export function Glyph({
	children,
	size = 48,
	variant = 'default',
	className,
}: {
	children: React.ReactNode
	size?: GlyphSize
	variant?: GlyphVariant
	className?: string
}) {
	const circleDiameter = Math.round(size * 0.68)

	return (
		<div
			className={cn(
				'relative inline-flex items-center justify-center shrink-0 border font-bold select-none',
				GLYPH_FONT[size],
				variant === 'default' && 'bg-[var(--receipt-bg)] text-[var(--text-color)]',
				variant === 'filled' && 'bg-[var(--border-color)] text-[var(--receipt-bg)]',
				variant === 'circle' && 'bg-[var(--receipt-bg)]',
				variant === 'circle-inverted' && 'bg-[var(--border-color)]',
				className,
			)}
			style={{ width: size, height: size }}
		>
			{(variant === 'circle' || variant === 'circle-inverted') && (
				<div
					className={cn(
						'absolute',
						variant === 'circle' && 'bg-[var(--border-color)]',
						variant === 'circle-inverted' && 'bg-[var(--receipt-bg)]',
					)}
					style={{ width: circleDiameter, height: circleDiameter, borderRadius: '50%' }}
				/>
			)}
			<span
				className={cn(
					'relative',
					variant === 'circle' && 'text-[var(--receipt-bg)]',
					variant === 'circle-inverted' && 'text-[var(--text-color)]',
					(variant === 'default' || variant === 'filled') && 'text-inherit',
				)}
			>
				{children}
			</span>
		</div>
	)
}

// ─── LEDGER ───────────────────────────────────────────────────────────────────
//
// A self-contained block: optional section label, key/value rows, divider, total.

export function Ledger({
	title,
	rows,
	total,
	className,
}: {
	title?: string
	rows: { label: string; value: string; fill?: boolean }[]
	total?: { label: string; value: string }
	className?: string
}) {
	return (
		<div className={cn('text-xs', className)}>
			{title && <SectionLabel>{title}</SectionLabel>}
			<div className="py-2 space-y-px">
				{rows.map((row, i) => (
					<Row key={i} label={row.label} value={row.value} fill={row.fill} />
				))}
			</div>
			{total && (
				<>
					<Divider variant="equals" />
					<Row label={total.label} value={total.value} bold />
				</>
			)}
		</div>
	)
}
