import { useState } from 'react'
import { type PricingProduct, PricingReceipt } from './pricing-receipt'
import { Button } from '@/components/button'

interface PricingTabsProps {
	catchUpProducts: PricingProduct[]
	keepUpProducts: PricingProduct[]
	catchUpDescription?: string
	keepUpDescription?: string
	footer?: React.ReactNode
}

export function PricingTabs({
	catchUpProducts,
	keepUpProducts,
	catchUpDescription = 'One-time projects · Get set up and running',
	keepUpDescription = 'Monthly plans · Ongoing maintenance and support',
	footer,
}: PricingTabsProps) {
	const [activeTab, setActiveTab] = useState<'catchup' | 'keepup'>('catchup')

	return (
		<>
			{/* Tabs */}
			<div className="flex justify-center mb-3 w-full max-w-[336px] mx-auto border border-solid border-foreground">
				<Button
					variant={activeTab === 'catchup' ? 'default' : 'secondary'}
					className="flex-1 rounded-[var(--radius)]"
					onClick={() => setActiveTab('catchup')}
				>
					Catch Up
				</Button>
				<Button
					variant={activeTab === 'keepup' ? 'default' : 'secondary'}
					className={`flex-1 rounded-[var(--radius)] border-l border-solid border-foreground`}
					onClick={() => setActiveTab('keepup')}
				>
					Keep Up
				</Button>
			</div>

			{/* Tab Description */}
			<div className="text-center mb-8">
				<p className="text-[var(--muted-color)] text-[11px]">
					{activeTab === 'catchup' ? catchUpDescription : keepUpDescription}
				</p>
			</div>

			{/* Receipts */}
			<div className="flex flex-wrap gap-12 justify-center items-start">
				{(activeTab === 'catchup' ? catchUpProducts : keepUpProducts).map((product) => (
					<PricingReceipt key={product.id} product={product} />
				))}
			</div>

			{/* Footer */}
			{footer && <div className="text-center mt-8">{footer}</div>}
		</>
	)
}
