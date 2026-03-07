'use client'

import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from '@/lib/utils'

function Slider({ className, ...props }: SliderPrimitive.Root.Props) {
	return (
		<SliderPrimitive.Root
			data-slot="slider"
			className={cn('relative flex w-full touch-none items-center select-none', className)}
			{...props}
		>
			<SliderTrack>
				<SliderFill />
				<SliderThumb />
			</SliderTrack>
		</SliderPrimitive.Root>
	)
}

function SliderTrack({ className, ...props }: SliderPrimitive.Track.Props) {
	return (
		<SliderPrimitive.Track
			data-slot="slider-track"
			className={cn(
				'relative h-3 w-full grow overflow-hidden rounded-[var(--radius)] bg-muted border-[length:var(--border-width)] border-foreground cursor-pointer',
				className,
			)}
			{...props}
		/>
	)
}

function SliderFill({ className, ...props }: SliderPrimitive.Indicator.Props) {
	return (
		<SliderPrimitive.Indicator
			data-slot="slider-fill"
			className={cn('absolute h-full bg-foreground', className)}
			{...props}
		/>
	)
}

function SliderThumb({ className, ...props }: SliderPrimitive.Thumb.Props) {
	return (
		<SliderPrimitive.Thumb
			data-slot="slider-thumb"
			className={cn(
				'block size-5 shrink-0 rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-background shadow-none ring-0 cursor-grab active:cursor-grabbing',
				'hover:bg-[var(--hover-bg)]',
				'focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-[var(--border-color)] focus-visible:outline-offset-2 focus-visible:bg-[var(--hover-bg)] focus-visible:z-[9999] focus-visible:relative',
				'disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	)
}

export { Slider, SliderTrack, SliderFill, SliderThumb }
