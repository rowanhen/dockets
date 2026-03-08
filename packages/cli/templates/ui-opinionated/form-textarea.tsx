import type * as React from 'react'

import { Textarea } from '@/components/ui/textarea'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	useField,
} from '@/components/ui/field'

export interface FormTextareaProps extends React.ComponentProps<'textarea'> {
	label?: string
	description?: string
	error?: string
	required?: boolean
	className?: string
}

function FormTextareaControl(props: React.ComponentProps<'textarea'>) {
	const { id, error } = useField()
	return (
		<Textarea
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

function FormTextarea({
	label,
	description,
	error,
	required,
	className,
	...textareaProps
}: FormTextareaProps) {
	return (
		<Field error={error} required={required} className={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			<FormTextareaControl {...textareaProps} required={required} />
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError />
		</Field>
	)
}

export { FormTextarea, Textarea }
