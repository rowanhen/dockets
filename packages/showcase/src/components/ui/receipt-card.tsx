import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLElement> {
	title?: string
	mode?: 'left' | 'right' | 'center'
}

const ReceiptCard = React.forwardRef<HTMLElement, CardProps>(
	({ children, mode = 'center', title, className, ...props }, ref) => {
		const leftClasses =
			'min-w-[10%] w-full shadow-[inset_1px_0_0_0_var(--border-color),inset_0_1px_0_0_var(--border-color)] py-2 px-[2ch]'

		const leftCornerClasses =
			'shrink-0 shadow-[inset_1px_0_0_0_var(--border-color),inset_0_1px_0_0_var(--border-color)] py-2 px-[1ch]'

		const rightClasses =
			'min-w-[10%] w-full shadow-[inset_-1px_0_0_0_var(--border-color),inset_0_1px_0_0_var(--border-color)] py-2 px-[2ch]'

		const rightCornerClasses =
			'shrink-0 shadow-[inset_-1px_0_0_0_var(--border-color),inset_0_1px_0_0_var(--border-color)] py-2 px-[1ch]'

		const titleClasses = 'shrink-0 px-[1ch] text-sm font-normal'

		let titleElement = (
			<header className="flex items-end justify-between">
				<div className={leftClasses} aria-hidden="true" />
				{title ? <h2 className={titleClasses}>{title}</h2> : null}
				<div className={rightClasses} aria-hidden="true" />
			</header>
		)

		if (mode === 'left') {
			titleElement = (
				<header className="flex items-end justify-between">
					<div className={leftCornerClasses} aria-hidden="true" />
					<h2 className={titleClasses}>{title}</h2>
					<div className={rightClasses} aria-hidden="true" />
				</header>
			)
		}

		if (mode === 'right') {
			titleElement = (
				<header className="flex items-end justify-between">
					<div className={leftClasses} aria-hidden="true" />
					<h2 className={titleClasses}>{title}</h2>
					<div className={rightCornerClasses} aria-hidden="true" />
				</header>
			)
		}

		return (
			<article
				ref={ref}
				data-slot="receipt-card"
				className={cn('relative block p-0 whitespace-pre-wrap', className)}
				{...props}
			>
				{titleElement}
				<section className="block py-2 px-[2ch] overflow-x-auto overflow-y-hidden shadow-[inset_1px_0_0_0_var(--border-color),inset_-1px_0_0_0_var(--border-color),inset_0_-1px_0_0_var(--border-color)] scrollbar-none">
					{children}
				</section>
			</article>
		)
	},
)
ReceiptCard.displayName = 'ReceiptCard'

export { ReceiptCard }
