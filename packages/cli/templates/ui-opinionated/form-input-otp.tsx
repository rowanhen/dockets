import type * as React from 'react'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from '@/components/ui/input-otp'
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from '@/components/ui/field'

export interface FormInputOTPProps {
	label?: string
	description?: string
	error?: string
	required?: boolean
	className?: string
	length?: number
	value?: string
	onChange?: (value: string) => void
	disabled?: boolean
	pattern?: RegExp
}

function FormInputOTP({
	label,
	description,
	error,
	required,
	className,
	...otpProps
}: FormInputOTPProps) {
	return (
		<Field error={error} required={required} className={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			<InputOTP {...otpProps} />
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError />
		</Field>
	)
}

export { FormInputOTP, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
