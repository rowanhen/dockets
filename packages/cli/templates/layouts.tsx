import { cn } from '@/lib/utils'

// ─── BORDER SYSTEM ────────────────────────────────────────────────────────────
//
// container: border border-[var(--border-color)] bg-[var(--border-color)] gap-px
// cells:     bg-[var(--receipt-bg)]
//
// Gap IS the border. Never add `border` to cells (stacks).
// Nested sub-grids: bg-[var(--border-color)] gap-px grid — no `border` on sub-containers.

// ─── STAT CELL ────────────────────────────────────────────────────────────────
//
// Helper primitive used as a direct grid child in layout components.
// Participates in the gap border system — no border of its own.

export function StatCell({
	label,
	value,
	large,
}: {
	label: string
	value: string
	large?: boolean
}) {
	return (
		<div className="bg-[var(--receipt-bg)] p-4">
			<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">{label}</div>
			<div className={cn('font-bold', large ? 'text-xl' : 'text-xs')}>{value}</div>
		</div>
	)
}

// ─── BENTO SPLIT ──────────────────────────────────────────────────────────────
//
// icon (200px, row-span-2) | content + stats
// Mobile: single column stack. Desktop: 200px icon col | 1fr content col.
// Icon is first in DOM — spans 2 rows via md:row-span-2 so content + stats
// auto-place into column 2.

export function BentoSplit({
	icon,
	content,
	stats,
	className,
}: {
	icon: React.ReactNode
	content: React.ReactNode
	stats: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-[200px_1fr]',
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			{/* Icon — spans both rows on desktop */}
			<div className="bg-[var(--receipt-bg)] flex items-center justify-center p-10 md:row-span-2">
				{icon}
			</div>
			{/* Content — auto-places into col 2, row 1 */}
			<div className="bg-[var(--receipt-bg)] p-4">{content}</div>
			{/* Stats — auto-places into col 2, row 2 */}
			<div>{stats}</div>
		</div>
	)
}

// ─── BENTO LEADER ─────────────────────────────────────────────────────────────
//
// Full-width header spanning all N columns, then N equal columns below.
// Desktop column count from lookup — static strings for Tailwind JIT scanner.

const LEADER_COLS: Record<2 | 3 | 4, string> = {
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4',
}

export function BentoLeader({
	header,
	columns,
	className,
}: {
	header: React.ReactNode
	columns: React.ReactNode[]
	className?: string
}) {
	const n = Math.min(Math.max(columns.length, 2), 4) as 2 | 3 | 4
	return (
		<div
			className={cn(
				'grid grid-cols-1',
				LEADER_COLS[n],
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			{/* Header spans all columns */}
			<div className="bg-[var(--receipt-bg)] md:[grid-column:1/-1]">{header}</div>
			{columns.map((col, i) => (
				<div key={i} className="bg-[var(--receipt-bg)]">
					{col}
				</div>
			))}
		</div>
	)
}

// ─── BENTO QUAD ───────────────────────────────────────────────────────────────
//
// 2×2 grid with 2fr | 1fr column ratio.
// Cell wrappers provide bg-[var(--receipt-bg)] only — slots control their own padding.

export function BentoQuad({
	topLeft,
	topRight,
	bottomLeft,
	bottomRight,
	className,
}: {
	topLeft: React.ReactNode
	topRight: React.ReactNode
	bottomLeft: React.ReactNode
	bottomRight: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-[2fr_1fr]',
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			<div className="bg-[var(--receipt-bg)]">{topLeft}</div>
			<div className="bg-[var(--receipt-bg)]">{topRight}</div>
			<div>{bottomLeft}</div>
			<div className="bg-[var(--receipt-bg)]">{bottomRight}</div>
		</div>
	)
}

// ─── BENTO TRIPLE ─────────────────────────────────────────────────────────────
//
// 3-row layout: header (full width) | aside + body | footer (full width)
// Desktop: 1fr | 2fr columns. Header and footer span both columns.
// Mobile stack order: header → aside → body → footer (natural DOM order).

export function BentoTriple({
	header,
	aside,
	body,
	footer,
	className,
}: {
	header: React.ReactNode
	aside: React.ReactNode
	body: React.ReactNode
	footer: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-[1fr_2fr]',
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			{/* Header spans both columns */}
			<div className="bg-[var(--receipt-bg)] md:[grid-column:1/-1]">{header}</div>
			{/* Aside — col 1, row 2 */}
			<div className="bg-[var(--receipt-bg)] flex items-center justify-center">{aside}</div>
			{/* Body — col 2, row 2 */}
			<div className="bg-[var(--receipt-bg)]">{body}</div>
			{/* Footer spans both columns */}
			<div className="bg-[var(--border-color)] md:[grid-column:1/-1]">{footer}</div>
		</div>
	)
}

// ─── HERO PRIMARY ─────────────────────────────────────────────────────────────
//
// Side panel (5fr, row-span-3) | 3-row content area (8fr).
// Side is first in DOM — md:row-span-3 lets header/body/footer auto-place into col 2.
// footer slot is opaque ReactNode (use StatCell sub-grid or anything).

export function HeroPrimary({
	side,
	header,
	body,
	footer,
	className,
}: {
	side: React.ReactNode
	header: React.ReactNode
	body: React.ReactNode
	footer: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-[5fr_8fr]',
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			{/* Side — spans 3 rows on desktop */}
			<div className="bg-[var(--receipt-bg)] flex items-center justify-center p-16 md:row-span-3">
				{side}
			</div>
			{/* Header — auto-places into col 2, row 1 */}
			<div className="bg-[var(--receipt-bg)] p-5">{header}</div>
			{/* Body — auto-places into col 2, row 2 */}
			<div className="bg-[var(--receipt-bg)] p-5">{body}</div>
			{/* Footer — auto-places into col 2, row 3 */}
			<div>{footer}</div>
		</div>
	)
}

// ─── CELL GRID ────────────────────────────────────────────────────────────────
//
// Rule A: equal-column grid with gap-as-border.
// Mobile: single column. Desktop: N equal columns.
// Grid bg IS the border color — gap-px exposes it as 1px lines.
// Cells need bg-[var(--receipt-bg)] on themselves.

const CELL_GRID_COLS: Record<2 | 3 | 4 | 5, string> = {
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4',
	5: 'md:grid-cols-5',
}

export function CellGrid({
	cols,
	subtle,
	className,
	children,
}: {
	cols: 2 | 3 | 4 | 5
	subtle?: boolean
	className?: string
	children: React.ReactNode
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1',
				CELL_GRID_COLS[cols],
				'gap-px',
				subtle
					? 'border border-[var(--border-subtle)] bg-[var(--border-subtle)]'
					: 'border border-[var(--border-color)] bg-[var(--border-color)]',
				className,
			)}
		>
			{children}
		</div>
	)
}

// ─── CELL ROW ─────────────────────────────────────────────────────────────────
//
// Rule B: flex direction flip with gap-as-divider.
// Mobile: flex-col (stacked). Desktop: flex-row (side by side).
// Children control their own widths via md:w-N md:shrink-0.

export function CellRow({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<div
			className={cn(
				'border border-[var(--border-color)]',
				'flex flex-col md:flex-row',
				'divide-y divide-[var(--border-color)] md:divide-y-0 md:divide-x divide-[var(--border-color)]',
				className,
			)}
		>
			{children}
		</div>
	)
}

// ─── HERO SECONDARY ───────────────────────────────────────────────────────────
//
// 3-row content (3fr) | side panel (1fr, explicit right column).
// statsRow: ReactNode[] — rendered in a nested sub-grid (each item a direct child).
// Side is last in DOM, explicitly placed at col 2 spanning all 3 rows.
// Mobile: natural DOM stack (side at bottom).

const STATS_COLS: Record<2 | 3 | 4, string> = {
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4',
}

export function HeroSecondary({
	header,
	statsRow,
	content,
	side,
	className,
}: {
	header: React.ReactNode
	statsRow: React.ReactNode[]
	content: React.ReactNode
	side: React.ReactNode
	className?: string
}) {
	const n = Math.min(Math.max(statsRow.length, 2), 4) as 2 | 3 | 4
	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-[3fr_1fr]',
				'border border-[var(--border-color)] bg-[var(--border-color)] gap-px',
				className,
			)}
		>
			{/* Header — col 1, row 1 */}
			<div className="bg-[var(--receipt-bg)] p-4">{header}</div>
			{/* Stats row — col 1, row 2: nested sub-grid */}
			<div className={cn('bg-[var(--border-color)] gap-px grid grid-cols-1', STATS_COLS[n])}>
				{statsRow.map((stat, i) => (
					<div key={i}>{stat}</div>
				))}
			</div>
			{/* Content — col 1, row 3 */}
			<div className="bg-[var(--receipt-bg)] p-4">{content}</div>
			{/* Side — explicitly placed at col 2, rows 1–4 on desktop */}
			<div className="bg-[var(--receipt-bg)] flex items-center justify-center p-12 md:[grid-column:2] md:[grid-row:1/4]">
				{side}
			</div>
		</div>
	)
}
