import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'flex field-sizing-content min-h-16 w-full rounded-[var(--radius)] border-[length:var(--border-width)] border-input bg-transparent px-2.5 py-2 text-xs placeholder:text-muted-foreground focus-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	)
}

export { Textarea }
