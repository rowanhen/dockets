import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'

export interface RadioOption {
	value: string
	label: string
	description?: string
	disabled?: boolean
}

export interface FormRadioGroupProps {
	options: RadioOption[]
	label?: string
	description?: string
	error?: string
	required?: boolean
	value?: string
	defaultValue?: string
	onValueChange?: (value: string) => void
	className?: string
	orientation?: 'horizontal' | 'vertical'
}

function FormRadioGroup({
	options,
	label,
	description,
	error,
	required,
	value,
	defaultValue,
	onValueChange,
	className,
	orientation = 'vertical',
}: FormRadioGroupProps) {
	return (
		<Field error={error} required={required} className={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			{description && <FieldDescription>{description}</FieldDescription>}
			<RadioGroup
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				className={orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'}
			>
				{options.map((opt) => {
					const id = `radio-${opt.value}`
					return (
						<div key={opt.value} className="flex items-start gap-2">
							<RadioGroupItem value={opt.value} id={id} disabled={opt.disabled} className="mt-0.5" />
							<div className="grid gap-0.5">
								<label htmlFor={id} className="text-xs font-medium uppercase tracking-wider">{opt.label}</label>
								{opt.description && (
									<p className="text-xs/relaxed text-muted-foreground">{opt.description}</p>
								)}
							</div>
						</div>
					)
				})}
			</RadioGroup>
			<FieldError />
		</Field>
	)
}

export { FormRadioGroup, RadioGroup, RadioGroupItem }
