import { useQuery } from 'convex/react'
import { Link } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { Logo } from '@/components/ui-opinionated/logo'
import { ThemeToggle } from '@/components/ui-opinionated/theme-toggle'

interface NavLinkConfig {
	to: string
	label: string
	useLink?: boolean
}

interface SimpleHeaderProps {
	/**
	 * Single navigation link (shorthand for navLinks with one item)
	 */
	navLink?: NavLinkConfig
	/**
	 * Additional navigation links rendered alongside the primary link
	 */
	navLinks?: NavLinkConfig[]
	/**
	 * Whether to use Link component (for internal pages) or anchor (for home page)
	 * @default true
	 */
	useLink?: boolean
	/**
	 * Where the "For Agents" link points
	 * @default '/for-agents'
	 */
	agentsTo?: string
}

export function SimpleHeader({
	navLink,
	navLinks,
	useLink = true,
	agentsTo = '/for-agents',
}: SimpleHeaderProps) {
	const user = useQuery(api.myFunctions.currentUser)

	return (
		<nav className="w-full sticky top-0 z-50">
			<div className="wrap flex justify-between items-center h-16">
				<div className="flex items-center gap-4">
					<Link to="/" className="flex items-center gap-2 no-underline">
						<Logo className="w-6 h-6" />
						<span className="font-bold">LEITWARE</span>
					</Link>
					<a href={agentsTo} className="text-[10px] uppercase no-underline">
						For Agents
					</a>
				</div>
				<div className="flex items-center gap-4">
					{[...(navLink ? [navLink] : []), ...(navLinks ?? [])].map((link) => {
						const useLinkComponent = link.useLink ?? useLink
						return useLinkComponent ? (
							<Link key={link.to} to={link.to} className="text-[10px] uppercase no-underline">
								{link.label}
							</Link>
						) : (
							<a key={link.to} href={link.to} className="text-[10px] uppercase no-underline">
								{link.label}
							</a>
						)
					})}
					{user !== undefined && (
						<Link to="/account" className="text-[10px] uppercase no-underline">
							{user ? `Signed in as ${user.email}` : 'Sign In / Sign Up'}
						</Link>
					)}
					<ThemeToggle />
				</div>
			</div>
		</nav>
	)
}
