'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselContextValue {
	scrollPrev: () => void
	scrollNext: () => void
	canScrollPrev: boolean
	canScrollNext: boolean
	listRef: React.RefObject<HTMLDivElement | null>
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
	const ctx = React.useContext(CarouselContext)
	if (!ctx) throw new Error('useCarousel must be used within <Carousel>')
	return ctx
}

interface CarouselProps extends React.ComponentProps<'div'> {
	orientation?: 'horizontal' | 'vertical'
}

function Carousel({ className, orientation = 'horizontal', children, ...props }: CarouselProps) {
	const listRef = React.useRef<HTMLDivElement>(null)
	const [canScrollPrev, setCanScrollPrev] = React.useState(false)
	const [canScrollNext, setCanScrollNext] = React.useState(true)

	const updateScroll = React.useCallback(() => {
		const el = listRef.current
		if (!el) return
		if (orientation === 'horizontal') {
			setCanScrollPrev(el.scrollLeft > 0)
			setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
		} else {
			setCanScrollPrev(el.scrollTop > 0)
			setCanScrollNext(el.scrollTop + el.clientHeight < el.scrollHeight - 1)
		}
	}, [orientation])

	React.useEffect(() => {
		const el = listRef.current
		if (!el) return
		el.addEventListener('scroll', updateScroll, { passive: true })
		updateScroll()
		return () => el.removeEventListener('scroll', updateScroll)
	}, [updateScroll])

	const scrollPrev = React.useCallback(() => {
		const el = listRef.current
		if (!el) return
		const amount = orientation === 'horizontal' ? el.clientWidth : el.clientHeight
		el.scrollBy({ [orientation === 'horizontal' ? 'left' : 'top']: -amount, behavior: 'smooth' })
	}, [orientation])

	const scrollNext = React.useCallback(() => {
		const el = listRef.current
		if (!el) return
		const amount = orientation === 'horizontal' ? el.clientWidth : el.clientHeight
		el.scrollBy({ [orientation === 'horizontal' ? 'left' : 'top']: amount, behavior: 'smooth' })
	}, [orientation])

	return (
		<CarouselContext.Provider value={{ scrollPrev, scrollNext, canScrollPrev, canScrollNext, listRef }}>
			<div
				data-slot="carousel"
				data-orientation={orientation}
				className={cn('relative', className)}
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	)
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
	const { listRef } = useCarousel()
	return (
		<div className="overflow-hidden">
			<div
				ref={listRef}
				data-slot="carousel-content"
				className={cn(
					'flex scroll-smooth',
					'overflow-x-auto snap-x snap-mandatory scrollbar-none',
					'data-[orientation=vertical]:flex-col data-[orientation=vertical]:overflow-y-auto data-[orientation=vertical]:overflow-x-hidden',
					className,
				)}
				{...props}
			/>
		</div>
	)
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="carousel-item"
			className={cn('min-w-0 shrink-0 grow-0 basis-full snap-start', className)}
			{...props}
		/>
	)
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<'button'>) {
	const { scrollPrev, canScrollPrev } = useCarousel()
	return (
		<button
			type="button"
			data-slot="carousel-previous"
			onClick={scrollPrev}
			disabled={!canScrollPrev}
			className={cn(
				'absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground bg-card text-card-foreground hover:bg-accent disabled:pointer-events-none disabled:opacity-30',
				className,
			)}
			aria-label="Previous slide"
			{...props}
		>
			<ChevronLeftIcon className="size-4" />
		</button>
	)
}

function CarouselNext({ className, ...props }: React.ComponentProps<'button'>) {
	const { scrollNext, canScrollNext } = useCarousel()
	return (
		<button
			type="button"
			data-slot="carousel-next"
			onClick={scrollNext}
			disabled={!canScrollNext}
			className={cn(
				'absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground bg-card text-card-foreground hover:bg-accent disabled:pointer-events-none disabled:opacity-30',
				className,
			)}
			aria-label="Next slide"
			{...props}
		>
			<ChevronRightIcon className="size-4" />
		</button>
	)
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
