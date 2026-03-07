import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--radius)] border border-transparent px-2 py-0.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 [&>svg]:pointer-events-none [&>svg]:size-3!',
	{
		variants: {
			variant: {
				default: 'bg-foreground text-background',
				secondary: 'bg-card text-card-foreground',
				destructive: 'bg-destructive text-destructive-foreground',
				outline: 'border-foreground border-dashed text-foreground',
				ghost: 'text-foreground/60',
				link: 'text-foreground underline-offset-4 underline',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Badge({
	className,
	variant = 'default',
	render,
	...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeVariants({ variant }), className),
			},
			props,
		),
		render,
		state: {
			slot: 'badge',
			variant,
		},
	})
}

export { Badge, badgeVariants }
