'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// ─── Field context ───────────────────────────────────────────────────────────

interface FieldContextValue {
	id: string
	error?: string
	required?: boolean
}

const FieldContext = React.createContext<FieldContextValue>({ id: '' })

function useField() {
	return React.useContext(FieldContext)
}

// ─── Field ───────────────────────────────────────────────────────────────────

interface FieldProps {
	error?: string
	required?: boolean
	children: React.ReactNode
	className?: string
}

function Field({ error, required, children, className }: FieldProps) {
	const id = React.useId()
	return (
		<FieldContext.Provider value={{ id, error, required }}>
			<div data-slot="field" className={cn('flex flex-col gap-1', className)}>
				{children}
			</div>
		</FieldContext.Provider>
	)
}

// ─── FieldLabel ──────────────────────────────────────────────────────────────

function FieldLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
	const { id, required, error } = useField()
	return (
		<label
			data-slot="field-label"
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

// ─── FieldControl ────────────────────────────────────────────────────────────

function FieldControl({ className, ...props }: React.ComponentProps<'div'>) {
	const { id, error } = useField()
	return (
		<div
			data-slot="field-control"
			id={id}
			aria-invalid={!!error}
			className={cn('', className)}
			{...props}
		/>
	)
}

// ─── FieldDescription ────────────────────────────────────────────────────────

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
	const { id } = useField()
	return (
		<p
			data-slot="field-description"
			id={`${id}-description`}
			className={cn('text-xs/relaxed text-muted-foreground', className)}
			{...props}
		/>
	)
}

// ─── FieldError ──────────────────────────────────────────────────────────────

function FieldError({ className, children, ...props }: React.ComponentProps<'p'>) {
	const { id, error } = useField()
	const message = children ?? error
	if (!message) return null
	return (
		<p
			data-slot="field-error"
			id={`${id}-error`}
			role="alert"
			className={cn('text-xs text-destructive', className)}
			{...props}
		>
			{message}
		</p>
	)
}

// ─── FieldSet ────────────────────────────────────────────────────────────────

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
	return (
		<fieldset
			data-slot="fieldset"
			className={cn('space-y-4 border-none p-0 m-0', className)}
			{...props}
		/>
	)
}

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldSet, useField }
