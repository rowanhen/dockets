import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export interface LabelledProgressProps {
	value?: number
	max?: number
	label?: string
	showValue?: boolean
	className?: string
}

function LabelledProgress({ value, max = 100, label, showValue = false, className }: LabelledProgressProps) {
	const pct = value != null ? Math.round((value / max) * 100) : undefined
	return (
		<div className={cn('flex flex-col gap-1', className)}>
			{(label || showValue) && (
				<div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
					{label && <span>{label}</span>}
					{showValue && <span className="text-muted-foreground">{pct != null ? `${pct}%` : '–'}</span>}
				</div>
			)}
			<Progress value={value ?? null} max={max} />
		</div>
	)
}

export { LabelledProgress as Progress }
export { Progress as ProgressRoot } from '@/components/ui/progress'
