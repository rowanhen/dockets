import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
	'relative w-full rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed p-4 text-xs/relaxed [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:size-4 [&>svg~*]:pl-6',
	{
		variants: {
			variant: {
				default: 'border-foreground bg-card text-card-foreground',
				destructive:
					'border-destructive/50 bg-destructive/5 text-destructive dark:border-destructive [&>svg]:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	)
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn('mb-1 font-medium uppercase tracking-wider leading-none', className)}
			{...props}
		/>
	)
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn('text-xs/relaxed [&_p]:leading-relaxed', className)}
			{...props}
		/>
	)
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
