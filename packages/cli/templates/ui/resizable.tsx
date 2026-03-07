'use client'

import * as React from 'react'
import { GripVerticalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Resizable panels implemented with pointer events — no heavy dependency.
// "Borders never stack" rule: the handle IS the border, so panels have no border of their own.

interface ResizablePanelGroupProps extends React.ComponentProps<'div'> {
	direction?: 'horizontal' | 'vertical'
}

function ResizablePanelGroup({
	className,
	direction = 'horizontal',
	children,
	...props
}: ResizablePanelGroupProps) {
	return (
		<div
			data-slot="resizable-panel-group"
			data-direction={direction}
			className={cn(
				'flex w-full rounded-[var(--radius)]',
				direction === 'horizontal' ? 'flex-row' : 'flex-col',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

interface ResizablePanelProps extends React.ComponentProps<'div'> {
	defaultSize?: number
	minSize?: number
}

function ResizablePanel({
	className,
	defaultSize,
	style,
	...props
}: ResizablePanelProps) {
	return (
		<div
			data-slot="resizable-panel"
			style={{ flexBasis: defaultSize ? `${defaultSize}%` : undefined, flexGrow: defaultSize ? 0 : 1, ...style }}
			className={cn('overflow-hidden', className)}
			{...props}
		/>
	)
}

interface ResizableHandleProps extends React.ComponentProps<'div'> {
	withHandle?: boolean
	direction?: 'horizontal' | 'vertical'
}

function ResizableHandle({
	className,
	withHandle = false,
	direction = 'horizontal',
	...props
}: ResizableHandleProps) {
	const handleRef = React.useRef<HTMLDivElement>(null)

	const onPointerDown = React.useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			e.preventDefault()
			const handle = handleRef.current
			if (!handle) return

			const prev = handle.previousElementSibling as HTMLElement | null
			const next = handle.nextElementSibling as HTMLElement | null
			if (!prev || !next) return

			const startX = e.clientX
			const startY = e.clientY
			const prevSize = direction === 'horizontal' ? prev.offsetWidth : prev.offsetHeight
			const nextSize = direction === 'horizontal' ? next.offsetWidth : next.offsetHeight
			const total = prevSize + nextSize

			handle.setPointerCapture(e.pointerId)

			const onMove = (moveEvent: PointerEvent) => {
				const delta =
					direction === 'horizontal'
						? moveEvent.clientX - startX
						: moveEvent.clientY - startY
				const newPrev = Math.min(Math.max(prevSize + delta, 80), total - 80)
				const newNext = total - newPrev
				prev.style.flexBasis = `${newPrev}px`
				next.style.flexBasis = `${newNext}px`
				prev.style.flexGrow = '0'
				next.style.flexGrow = '0'
			}

			const onUp = () => {
				handle.removeEventListener('pointermove', onMove as EventListener)
				handle.removeEventListener('pointerup', onUp)
			}

			handle.addEventListener('pointermove', onMove as EventListener)
			handle.addEventListener('pointerup', onUp)
		},
		[direction],
	)

	return (
		<div
			ref={handleRef}
			data-slot="resizable-handle"
			onPointerDown={onPointerDown}
			className={cn(
				'relative flex shrink-0 items-center justify-center bg-border',
				direction === 'horizontal'
					? 'w-[length:var(--border-width)] cursor-col-resize'
					: 'h-[length:var(--border-width)] cursor-row-resize',
				'after:absolute after:z-10',
				direction === 'horizontal'
					? 'after:inset-y-0 after:w-3 after:-translate-x-1/2'
					: 'after:inset-x-0 after:h-3 after:-translate-y-1/2',
				'focus-ring',
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div className="z-10 flex h-6 w-3 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-card">
					<GripVerticalIcon className="size-2.5" />
				</div>
			)}
		</div>
	)
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
