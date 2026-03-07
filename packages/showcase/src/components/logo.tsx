export function Logo({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
			<rect x="0" y="0" width="3" height="24" />
			<rect x="21" y="0" width="3" height="24" />
			<rect x="0" y="0" width="24" height="3" />
			<rect x="0" y="7" width="24" height="3" />
			<rect x="0" y="14" width="24" height="3" />
			<rect x="0" y="21" width="24" height="3" />
		</svg>
	)
}
