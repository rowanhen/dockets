import { CAL_LINK } from '@/lib/constants'

interface MarketingFooterProps {
	/**
	 * The call-to-action link URL
	 * @default CAL_LINK
	 */
	ctaLink?: string
	/**
	 * The call-to-action text
	 * @default "Book a Call"
	 */
	ctaText?: string
}

export function MarketingFooter({
	ctaLink = CAL_LINK,
	ctaText = 'Book a Call',
}: MarketingFooterProps) {
	return (
		<footer className="border-t border-[var(--border-subtle)] py-6">
			<div className="wrap flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-xs text-muted-foreground">© {new Date().getFullYear()} LEITWARE</p>
				<a
					href={ctaLink}
					className="text-xs text-muted-foreground hover:text-klein focus-ring"
				>
					{ctaText}
				</a>
			</div>
		</footer>
	)
}
