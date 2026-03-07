import * as React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export interface SimpleCarouselProps {
	items: React.ReactNode[]
	className?: string
	itemClassName?: string
	showControls?: boolean
}

function SimpleCarousel({ items, className, itemClassName, showControls = true }: SimpleCarouselProps) {
	return (
		<Carousel className={cn('w-full', className)}>
			<CarouselContent>
				{items.map((item, i) => (
					<CarouselItem key={i} className={itemClassName}>
						{item}
					</CarouselItem>
				))}
			</CarouselContent>
			{showControls && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	)
}

export { SimpleCarousel as Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
export { Carousel as CarouselRoot } from '@/components/ui/carousel'
