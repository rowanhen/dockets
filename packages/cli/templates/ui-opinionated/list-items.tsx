import { Check } from 'lucide-react'

interface ArrowListItemProps {
	children: React.ReactNode
}

export function ArrowListItem({ children }: ArrowListItemProps) {
	return (
		<li className="flex items-start gap-3">
			<span className="text-klein text-sm">→</span>
			<span className="text-muted-foreground">{children}</span>
		</li>
	)
}

interface CheckListItemProps {
	children: React.ReactNode
	/**
	 * Whether to display with a border and padding (card style)
	 * @default false
	 */
	bordered?: boolean
}

export function CheckListItem({ children, bordered = false }: CheckListItemProps) {
	if (bordered) {
		return (
			<li className="flex items-start gap-3 border p-4">
				<Check className="w-5 h-5 text-klein flex-shrink-0 mt-0.5" aria-hidden="true" />
				<span className="text-sm">{children}</span>
			</li>
		)
	}

	return (
		<li className="flex items-start gap-3">
			<Check className="w-4 h-4 text-klein flex-shrink-0 mt-1" aria-hidden="true" />
			<span className="text-muted-foreground text-sm">{children}</span>
		</li>
	)
}
