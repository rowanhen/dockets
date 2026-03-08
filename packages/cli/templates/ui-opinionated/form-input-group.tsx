import type * as React from 'react'

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
} from '@/components/ui/input-group'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'

export interface FormInputGroupProps {
	label?: string
	description?: string
	error?: string
	required?: boolean
	className?: string
	children: React.ReactNode
}

function FormInputGroup({
	label,
	description,
	error,
	required,
	className,
	children,
}: FormInputGroupProps) {
	return (
		<Field error={error} required={required} className={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			<InputGroup>{children}</InputGroup>
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError />
		</Field>
	)
}

export {
	FormInputGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
}
