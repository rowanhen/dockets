import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/button'
import { CAL_LINK } from '@/lib/constants'

interface MarketingHeaderProps {
	/**
	 * The call-to-action link URL
	 * @default CAL_LINK
	 */
	ctaLink?: string
	/**
	 * The call-to-action button text
	 * @default "Get Started"
	 */
	ctaText?: string
}

export function MarketingHeader({
	ctaLink = CAL_LINK,
	ctaText = 'Get Started',
}: MarketingHeaderProps) {
	return (
		<nav
			className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[var(--border-subtle)]"
			aria-label="Main navigation"
		>
			<div className="wrap flex items-center justify-between h-16">
				<a
					href="/"
					className="flex items-center gap-2 font-medium focus-ring"
					aria-label="LEITWARE home"
				>
					<Logo className="w-7 h-7" />
					<span>LEITWARE</span>
				</a>
				<div className="flex items-center gap-3">
					<ThemeToggle />
					<Button asChild size="sm">
						<a href={ctaLink}>{ctaText}</a>
					</Button>
				</div>
			</div>
		</nav>
	)
}
