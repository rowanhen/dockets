import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import {
	Field,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'

export interface FormCheckboxProps {
	id?: string
	label?: React.ReactNode
	description?: string
	error?: string
	checked?: boolean
	defaultChecked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
	required?: boolean
	className?: string
}

function FormCheckbox({
	id,
	label,
	description,
	error,
	checked,
	defaultChecked,
	onCheckedChange,
	disabled,
	required,
	className,
}: FormCheckboxProps) {
	const generatedId = React.useId()
	const fieldId = id ?? generatedId

	return (
		<Field error={error} required={required} className={className}>
			<div className="flex items-start gap-2">
				<Checkbox
					id={fieldId}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					disabled={disabled}
					aria-invalid={!!error}
					className="mt-0.5"
				/>
				{label && (
					<div className="grid gap-1">
						<label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wider">{label}</label>
						{description && <FieldDescription>{description}</FieldDescription>}
					</div>
				)}
			</div>
			<FieldError />
		</Field>
	)
}

export { FormCheckbox, Checkbox }
