'use client'

import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import * as React from 'react'
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
				'relative h-1.5 w-full grow overflow-hidden rounded-none bg-muted border-[length:var(--border-width)] border-foreground/30',
				className,
			)}
			{...props}
		/>
	)
}

function SliderFill({ className, ...props }: SliderPrimitive.Fill.Props) {
	return (
		<SliderPrimitive.Fill
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
				'block size-4 rounded-none border-[length:var(--border-width)] border-foreground bg-card shadow-none transition-colors',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	)
}

export { Slider, SliderTrack, SliderFill, SliderThumb }
