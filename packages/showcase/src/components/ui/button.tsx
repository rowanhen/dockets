import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium uppercase tracking-wider disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-foreground text-primary-foreground hover:bg-foreground/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border-[length:var(--border-width)] border-dashed border-foreground bg-transparent hover:bg-foreground/5',
				secondary: 'bg-card text-card-foreground',
				ghost: 'hover:text-foreground',
				link: 'text-foreground underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-6 py-2',
				sm: 'h-9 px-4',
				lg: 'h-11 px-6',
				xl: 'h-12 px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	render?: React.ReactElement<Record<string, unknown>>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, render, children, ...props }, ref) => {
		const classes = cn(buttonVariants({ variant, size, className }))

		// Base UI render prop pattern (preferred)
		if (render) {
			const renderProps = render.props as Record<string, unknown>
			return React.cloneElement(render, {
				...props,
				ref,
				className: cn(classes, renderProps.className as string | undefined),
				children: (renderProps.children as React.ReactNode) ?? children,
			})
		}

		// Legacy asChild pattern (backwards-compatible without Radix Slot)
		if (asChild && React.isValidElement(children)) {
			const childProps = (children as React.ReactElement<Record<string, unknown>>).props as Record<
				string,
				unknown
			>
			return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
				...props,
				ref,
				className: cn(classes, childProps.className as string | undefined),
			})
		}

		return (
			<button data-slot="button" className={classes} ref={ref} {...props}>
				{children}
			</button>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
