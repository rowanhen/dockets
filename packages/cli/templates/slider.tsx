import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export interface LabelledSliderProps {
	value?: number[]
	defaultValue?: number[]
	min?: number
	max?: number
	step?: number
	label?: string
	showValue?: boolean
	onValueChange?: (value: number[]) => void
	className?: string
	disabled?: boolean
}

function LabelledSlider({
	value,
	defaultValue,
	min = 0,
	max = 100,
	step = 1,
	label,
	showValue = false,
	onValueChange,
	className,
	disabled,
}: LabelledSliderProps) {
	const displayValue = value ?? defaultValue
	return (
		<div className={cn('flex flex-col gap-2', className)}>
			{(label || showValue) && (
				<div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
					{label && <span>{label}</span>}
					{showValue && displayValue && (
						<span className="text-muted-foreground">{displayValue.join(' – ')}</span>
					)}
				</div>
			)}
			<Slider
				value={value}
				defaultValue={defaultValue}
				min={min}
				max={max}
				step={step}
				onValueChange={onValueChange}
				disabled={disabled}
			/>
		</div>
	)
}

export { LabelledSlider as Slider }
export { Slider as SliderRoot } from '@/components/ui/slider'
