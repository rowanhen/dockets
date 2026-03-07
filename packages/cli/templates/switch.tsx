import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface SwitchFieldProps {
	id?: string
	label?: React.ReactNode
	description?: string
	checked?: boolean
	defaultChecked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
	className?: string
}

function SwitchField({
	id,
	label,
	description,
	checked,
	defaultChecked,
	onCheckedChange,
	disabled,
	className,
}: SwitchFieldProps) {
	const fieldId = id ?? React.useId()
	return (
		<div className={cn('flex items-center justify-between gap-4', className)}>
			{label && (
				<div className="grid gap-0.5">
					<Label htmlFor={fieldId}>{label}</Label>
					{description && (
						<p className="text-xs/relaxed text-muted-foreground">{description}</p>
					)}
				</div>
			)}
			<Switch
				id={fieldId}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
			/>
		</div>
	)
}

export { SwitchField, Switch }
