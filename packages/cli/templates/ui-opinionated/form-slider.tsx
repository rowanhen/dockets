import { Slider } from '@/components/ui/slider'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'

export interface FormSliderProps {
	value?: number[]
	defaultValue?: number[]
	min?: number
	max?: number
	step?: number
	label?: string
	description?: string
	error?: string
	required?: boolean
	showValue?: boolean
	onValueChange?: (value: number | readonly number[]) => void
	className?: string
	disabled?: boolean
}

function FormSlider({
	value,
	defaultValue,
	min = 0,
	max = 100,
	step = 1,
	label,
	description,
	error,
	required,
	showValue = false,
	onValueChange,
	className,
	disabled,
}: FormSliderProps) {
	const displayValue = value ?? defaultValue

	return (
		<Field error={error} required={required} className={cn('gap-2', className)}>
			{(label || showValue) && (
				<div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
					{label && <FieldLabel className="contents">{label}</FieldLabel>}
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
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError />
		</Field>
	)
}

export { FormSlider, Slider }
