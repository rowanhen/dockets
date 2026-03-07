'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Lightweight form context — no react-hook-form dependency.
// Pass your own errors/touched state in or wire to your form library.

interface FormFieldContextValue {
	id: string
	name: string
	error?: string
	required?: boolean
}

const FormFieldContext = React.createContext<FormFieldContextValue>({
	id: '',
	name: '',
})

function useFormField() {
	return React.useContext(FormFieldContext)
}

function Form({ className, ...props }: React.ComponentProps<'form'>) {
	return (
		<form
			data-slot="form"
			className={cn('space-y-4', className)}
			{...props}
		/>
	)
}

interface FormFieldProps {
	name: string
	error?: string
	required?: boolean
	children: React.ReactNode
	className?: string
}

function FormField({ name, error, required, children, className }: FormFieldProps) {
	const id = React.useId()
	return (
		<FormFieldContext.Provider value={{ id, name, error, required }}>
			<div data-slot="form-field" className={cn('flex flex-col gap-1', className)}>
				{children}
			</div>
		</FormFieldContext.Provider>
	)
}

function FormLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
	const { id, required, error } = useFormField()
	return (
		<label
			data-slot="form-label"
			htmlFor={id}
			className={cn(
				'text-xs font-medium uppercase tracking-wider',
				error && 'text-destructive',
				className,
			)}
			{...props}
		>
			{children}
			{required && <span className="ml-0.5 text-destructive">*</span>}
		</label>
	)
}

function FormControl({ className, ...props }: React.ComponentProps<'div'>) {
	const { id, error } = useFormField()
	return (
		<div
			data-slot="form-control"
			id={id}
			aria-invalid={!!error}
			className={cn('', className)}
			{...props}
		/>
	)
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			data-slot="form-description"
			className={cn('text-xs/relaxed text-muted-foreground', className)}
			{...props}
		/>
	)
}

function FormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
	const { error } = useFormField()
	const message = children ?? error
	if (!message) return null
	return (
		<p
			data-slot="form-message"
			role="alert"
			className={cn('text-xs text-destructive', className)}
			{...props}
		>
			{message}
		</p>
	)
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="form-item"
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

export { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem, useFormField }
