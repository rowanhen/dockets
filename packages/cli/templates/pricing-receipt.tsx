import { ReceiptDivider, SectionHeader } from './contact-footer'

export interface PricingProduct {
	id: string
	orderNum: string
	title: string
	subtitle?: string
	items: { name: string; value: string }[]
	total: string
	cta: string
	link: string
	learnMoreLink?: string
}

interface PricingReceiptProps {
	product: PricingProduct
}

export function PricingReceipt({ product }: PricingReceiptProps) {
	return (
		<div className="bg-[var(--receipt-bg)] border w-full min-w-[288px] max-w-[336px] flex-1 p-6 text-sm leading-tight">
			{/* Header */}
			<div className="text-center h-12 mb-3">
				<div className="text-base font-bold mb-1"># {product.orderNum}</div>
				<div className="text-xs uppercase">{product.title}</div>
				<div className="text-[10px] text-[var(--muted-color)] mt-0.5 h-4">
					{product.subtitle || '\u00A0'}
				</div>
			</div>

			<ReceiptDivider />

			<SectionHeader>INCLUDES</SectionHeader>

			{/* Items */}
			<div className="h-24 mb-4">
				{product.items.map((item) => (
					<div key={item.name} className="flex justify-between items-start mb-px text-xs">
						<span className="flex-1 uppercase break-words">{item.name}</span>
						<span className="min-w-[72px] text-right shrink-0">{item.value}</span>
					</div>
				))}
			</div>

			<ReceiptDivider />

			{/* Total */}
			<div className="h-6 mb-4">
				<div className="flex justify-between text-xs mb-0.5">
					<span>TOTAL:</span>
					<span>{product.total}</span>
				</div>
			</div>

			{/* CTA */}
			<a
				href={product.link}
				className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] uppercase tracking-wide border bg-[var(--border-color)] text-[var(--receipt-bg)] no-underline cursor-pointer w-full text-center"
			>
				{product.cta}
			</a>

			{/* Footer */}
			<div className="text-center h-6 pt-4 text-[11px]">
				<a href={product.learnMoreLink || product.link} className="text-[11px] no-underline lowercase">
					learn more
				</a>
			</div>
		</div>
	)
}
