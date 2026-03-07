import { Link } from '@tanstack/react-router'

interface SimpleFooterProps {
	/**
	 * Maximum width class for the footer content
	 * @default "max-w-[768px]"
	 */
	maxWidth?: string
	/**
	 * Company name to display
	 * @default "Leitware Ltd"
	 */
	companyName?: string
}

export function SimpleFooter({
	maxWidth = 'max-w-[768px]',
	companyName = 'Leitware Ltd',
}: SimpleFooterProps) {
	return (
		<footer>
			<div className={`${maxWidth} mx-auto px-6 py-8`}>
				<div className="text-center text-[var(--muted-color)] text-[10px] uppercase mb-2">
					© {new Date().getFullYear()} {companyName}
				</div>
				<div className="flex gap-4 justify-center">
					<Link
						to="/terms-and-conditions"
						className="text-[var(--muted-color)] text-[10px] uppercase no-underline hover:underline"
					>
						Terms & Conditions
					</Link>
					<Link
						to="/privacy"
						className="text-[var(--muted-color)] text-[10px] uppercase no-underline hover:underline"
					>
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	)
}
