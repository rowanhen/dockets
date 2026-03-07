import * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
	label?: string
	description?: string
	error?: string
	disabled?: boolean
	required?: boolean
	className?: string
}

function FormInput({
	label,
	description,
	error,
	disabled = false,
	required = false,
	className,
	id,
	...inputProps
}: FormInputProps) {
	const generatedId = React.useId()
	const inputId = id || generatedId
	const hasError = Boolean(error)

	return (
		<div className={cn('flex flex-col gap-1', className)} data-invalid={hasError || undefined}>
			{label && (
				<label htmlFor={inputId} className="text-xs font-medium uppercase tracking-wider">
					{label}
					{required && <span className="text-destructive ml-0.5">*</span>}
				</label>
			)}
			<Input
				{...inputProps}
				id={inputId}
				disabled={disabled}
				required={required}
				aria-invalid={hasError}
				aria-required={required}
				aria-describedby={
					[description ? `${inputId}-desc` : null, error ? `${inputId}-error` : null]
						.filter(Boolean)
						.join(' ') || undefined
				}
			/>
			{description && (
				<p id={`${inputId}-desc`} className="text-[10px] text-muted-foreground">
					{description}
				</p>
			)}
			{error && (
				<p id={`${inputId}-error`} className="text-[10px] text-destructive">
					{error}
				</p>
			)}
		</div>
	)
}

export { FormInput }
