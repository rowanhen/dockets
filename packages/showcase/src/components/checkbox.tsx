import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CheckboxFieldProps {
	id?: string
	label?: React.ReactNode
	description?: string
	checked?: boolean
	defaultChecked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
	className?: string
}

function CheckboxField({
	id,
	label,
	description,
	checked,
	defaultChecked,
	onCheckedChange,
	disabled,
	className,
}: CheckboxFieldProps) {
	const fieldId = id ?? React.useId()
	return (
		<div className={cn('flex items-start gap-2', className)}>
			<Checkbox
				id={fieldId}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
				className="mt-0.5"
			/>
			{label && (
				<div className="grid gap-1">
					<Label htmlFor={fieldId}>{label}</Label>
					{description && (
						<p className="text-xs/relaxed text-muted-foreground">{description}</p>
					)}
				</div>
			)}
		</div>
	)
}

export { CheckboxField, Checkbox }
