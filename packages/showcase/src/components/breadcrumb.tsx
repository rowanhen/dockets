interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<div className="wrap py-4 border-b border-[var(--border-subtle)]">
			<nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
				{items.map((item, index) => (
					<span key={index}>
						{index > 0 && <span className="mx-2">/</span>}
						{item.href ? (
							<a href={item.href} className="hover:text-klein">
								{item.label}
							</a>
						) : (
							<span className={index === items.length - 1 ? 'text-foreground' : ''}>
								{item.label}
							</span>
						)}
					</span>
				))}
			</nav>
		</div>
	)
}
