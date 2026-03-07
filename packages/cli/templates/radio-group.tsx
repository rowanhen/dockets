import * as React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface RadioOption {
	value: string
	label: string
	description?: string
	disabled?: boolean
}

export interface RadioGroupFieldProps {
	options: RadioOption[]
	value?: string
	defaultValue?: string
	onValueChange?: (value: string) => void
	className?: string
	orientation?: 'horizontal' | 'vertical'
}

function RadioGroupField({
	options,
	value,
	defaultValue,
	onValueChange,
	className,
	orientation = 'vertical',
}: RadioGroupFieldProps) {
	return (
		<RadioGroup
			value={value}
			defaultValue={defaultValue}
			onValueChange={onValueChange}
			className={cn(
				orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
				className,
			)}
		>
			{options.map((opt) => {
				const id = `radio-${opt.value}`
				return (
					<div key={opt.value} className="flex items-start gap-2">
						<RadioGroupItem value={opt.value} id={id} disabled={opt.disabled} className="mt-0.5" />
						<div className="grid gap-0.5">
							<Label htmlFor={id}>{opt.label}</Label>
							{opt.description && (
								<p className="text-xs/relaxed text-muted-foreground">{opt.description}</p>
							)}
						</div>
					</div>
				)
			})}
		</RadioGroup>
	)
}

export { RadioGroupField, RadioGroup, RadioGroupItem }
