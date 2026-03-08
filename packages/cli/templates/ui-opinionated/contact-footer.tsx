import { useMutation } from 'convex/react'
import { Check } from 'lucide-react'
import { BlockLoader } from '@/components/ui-opinionated/block-loader'
import { useState } from 'react'
import { FormInput } from '@/components/ui-opinionated/form-input'
import { Button } from '@/components/ui-opinionated/button'
import { CAL_LINK, COMPANY_EMAIL, COMPANY_PHONE } from '@/lib/constants'
import { api } from '../../convex/_generated/api'

interface ContactFooterProps {
	/**
	 * Override the Cal.com booking link
	 * @default CAL_LINK
	 */
	calLink?: string
}

export function ReceiptDivider() {
	return (
		<div className="text-xs my-3 tracking-[-1px] h-[1em] relative text-center overflow-hidden">
			<span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap tracking-[-1px]">
				..................................................
			</span>
		</div>
	)
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[11px] font-bold mb-2 text-center py-[3px] border-t border-b bg-[var(--border-color)] text-[var(--receipt-bg)]">
			{children}
		</div>
	)
}

export function ContactFooter({ calLink = CAL_LINK }: ContactFooterProps) {
	return (
		<footer className="mt-12 max-w-[1152px] mx-auto px-6">
			<div className="bg-[var(--receipt-bg)] border border-b-0">
				<div className="max-w-[576px] mx-auto px-6 pt-6 pb-12">
					<div className="text-center h-12 mb-3">
						<div className="text-base font-bold mb-1"># CONTACT</div>
						<div className="text-xs uppercase">request follow up</div>
						<div className="text-[10px] text-[var(--muted-color)] mt-0.5 h-4">
							or{' '}
							<a href={calLink} className="underline">
								book a call instead
							</a>
						</div>
					</div>

					<ReceiptDivider />

					<SectionHeader>YOUR DETAILS</SectionHeader>

					<FollowUpForm calLink={calLink} />

					<div className="mt-6">
						<ReceiptDivider />
					</div>

					<div className="text-center pt-4 text-[11px]">
						<div className="mb-4">Thank You</div>
							<div className="text-[var(--muted-color)] text-[10px] uppercase mb-1">
							© {new Date().getFullYear()} LEITWARE
						</div>
						<div className="text-[var(--muted-color)] text-[10px] mb-1">
							<a href={`mailto:${COMPANY_EMAIL}`} className="no-underline hover:underline">
								{COMPANY_EMAIL}
							</a>
						</div>
						<div className="text-[var(--muted-color)] text-[10px] mb-2">
							<a href={`tel:${COMPANY_PHONE}`} className="no-underline hover:underline">
								+44 778 004 2494
							</a>
						</div>
						<div className="flex gap-4 justify-center">
							<a
								href="/terms-and-conditions"
								className="text-[var(--muted-color)] text-[10px] uppercase no-underline hover:underline"
							>
								Terms &amp; Conditions
							</a>
							<a
								href="/privacy"
								className="text-[var(--muted-color)] text-[10px] uppercase no-underline hover:underline"
							>
								Privacy Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

function FollowUpForm({ calLink = CAL_LINK }: { calLink?: string }) {
	const submitFollowUp = useMutation(api.myFunctions.submitFollowUp)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)
		setError(null)

		const formData = new FormData(e.currentTarget)

		try {
			await submitFollowUp({
				email: formData.get('email') as string,
				name: formData.get('name') as string,
				companyName: formData.get('companyName') as string,
				website: (formData.get('website') as string) || undefined,
				useCases: formData.get('useCases') as string,
				otherDetails: (formData.get('otherDetails') as string) || undefined,
			})
			setIsSubmitted(true)
		} catch {
			setError('Something went wrong. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (isSubmitted) {
		return (
			<div className="text-center py-8">
				<Check className="w-6 h-6 mx-auto mb-3" />
				<div className="font-bold uppercase text-xs">Received!</div>
				<div className="text-[var(--muted-color)] text-[11px] mt-1">We'll be in touch soon.</div>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-2 gap-3 mb-3">
				<FormInput label="Name" required name="name" autoComplete="name" />
				<FormInput label="Email" required name="email" type="email" autoComplete="email" />
			</div>
			<div className="grid grid-cols-2 gap-3 mb-3">
				<FormInput label="Company" required name="companyName" autoComplete="organization" />
				<FormInput label="Website" name="website" type="url" placeholder="https://..." autoComplete="url" />
			</div>
			<div className="mb-3">
				<label htmlFor="useCases" className="text-xs font-medium uppercase tracking-wider">
					What do you want to automate?<span className="text-destructive ml-0.5">*</span>
				</label>
				<textarea
					id="useCases"
					name="useCases"
					required
					rows={3}
					className="w-full p-2 text-xs border bg-[var(--receipt-bg)] text-[var(--text-color)] resize-none mt-1"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="otherDetails" className="text-xs font-medium uppercase tracking-wider">
					Other Details
				</label>
				<textarea
					id="otherDetails"
					name="otherDetails"
					rows={2}
					className="w-full p-2 text-xs border bg-[var(--receipt-bg)] text-[var(--text-color)] resize-none mt-1"
				/>
			</div>
			{error && <p className="text-[11px] text-destructive mb-3">{error}</p>}
			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? (
					<>
						<BlockLoader />
						Processing...
					</>
				) : (
					'Request Follow Up'
				)}
			</Button>
			<div className="text-center mt-3">
				<Button
					render={<a href={calLink} />}
					variant="link"
					className="text-[10px] text-muted-foreground"
				>
					or book a call instead →
				</Button>
			</div>
		</form>
	)
}
