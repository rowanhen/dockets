import type * as React from 'react'

import { Input } from '@/components/ui/input'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	useField,
} from '@/components/ui/field'

export interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
	label?: string
	description?: string
	error?: string
	disabled?: boolean
	required?: boolean
	className?: string
}

function FormInputControl(props: Omit<React.ComponentProps<'input'>, 'size'>) {
	const { id, error } = useField()
	return (
		<Input
			{...props}
			id={id}
			aria-invalid={!!error}
			aria-describedby={
				[id ? `${id}-description` : null, error ? `${id}-error` : null]
					.filter(Boolean)
					.join(' ') || undefined
			}
		/>
	)
}

function FormInput({
	label,
	description,
	error,
	required,
	className,
	...inputProps
}: FormInputProps) {
	return (
		<Field error={error} required={required} className={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			<FormInputControl {...inputProps} required={required} />
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError />
		</Field>
	)
}

export { FormInput }
