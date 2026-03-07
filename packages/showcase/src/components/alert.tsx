import { AlertCircleIcon, InfoIcon, CheckCircleIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { VariantProps } from 'class-variance-authority'
import type { alertVariants } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

const icons = {
	default: InfoIcon,
	destructive: AlertCircleIcon,
	success: CheckCircleIcon,
}

export interface SimpleAlertProps extends VariantProps<typeof alertVariants> {
	title?: string
	description?: string
	className?: string
	icon?: React.ReactNode
	children?: React.ReactNode
}

function SimpleAlert({
	variant = 'default',
	title,
	description,
	className,
	icon,
	children,
}: SimpleAlertProps) {
	const Icon = icons[variant ?? 'default']
	return (
		<Alert variant={variant} className={cn(className)}>
			{icon ?? <Icon />}
			{title && <AlertTitle>{title}</AlertTitle>}
			{description && <AlertDescription>{description}</AlertDescription>}
			{children}
		</Alert>
	)
}

export { SimpleAlert as Alert, AlertTitle, AlertDescription }
export { Alert as AlertRoot } from '@/components/ui/alert'
