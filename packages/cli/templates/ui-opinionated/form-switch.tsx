import * as React from 'react'

import { Switch } from '@/components/ui/switch'
import {
	Field,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'

export interface FormSwitchProps {
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

function FormSwitch({
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
}: FormSwitchProps) {
	const generatedId = React.useId()
	const fieldId = id ?? generatedId

	return (
		<Field error={error} required={required} className={className}>
			<div className="flex items-center justify-between gap-4">
				{label && (
					<div className="grid gap-0.5">
						<label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wider">{label}</label>
						{description && <FieldDescription>{description}</FieldDescription>}
					</div>
				)}
				<Switch
					id={fieldId}
					checked={checked}
					defaultChecked={defaultChecked}
					onCheckedChange={onCheckedChange}
					disabled={disabled}
					aria-invalid={!!error}
				/>
			</div>
			<FieldError />
		</Field>
	)
}

export { FormSwitch, Switch }
