'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputOTPProps {
	length?: number
	value?: string
	onChange?: (value: string) => void
	disabled?: boolean
	className?: string
	pattern?: RegExp
}

function InputOTP({
	length = 6,
	value = '',
	onChange,
	disabled,
	className,
	pattern = /^[0-9]*$/,
}: InputOTPProps) {
	const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

	const chars = Array.from({ length }, (_, i) => value[i] ?? '')

	const handleChange = (idx: number, char: string) => {
		if (char && !pattern.test(char)) return
		const next = chars.map((c, i) => (i === idx ? char.slice(-1) : c)).join('')
		onChange?.(next)
		if (char && idx < length - 1) {
			inputRefs.current[idx + 1]?.focus()
		}
	}

	const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !chars[idx] && idx > 0) {
			inputRefs.current[idx - 1]?.focus()
			const next = chars.map((c, i) => (i === idx - 1 ? '' : c)).join('')
			onChange?.(next)
		}
		if (e.key === 'ArrowLeft' && idx > 0) inputRefs.current[idx - 1]?.focus()
		if (e.key === 'ArrowRight' && idx < length - 1) inputRefs.current[idx + 1]?.focus()
	}

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault()
		const pasted = e.clipboardData.getData('text').slice(0, length)
		if (!pattern.test(pasted)) return
		onChange?.(pasted.padEnd(0, ''))
		const focusIdx = Math.min(pasted.length, length - 1)
		inputRefs.current[focusIdx]?.focus()
	}

	return (
		<div
			data-slot="input-otp"
			className={cn('flex items-center gap-0', className)}
		>
			{chars.map((char, idx) => (
				<React.Fragment key={idx}>
					{idx > 0 && idx % 3 === 0 && (
						<div
							data-slot="input-otp-separator"
							className="flex w-4 items-center justify-center text-xs text-muted-foreground select-none"
							aria-hidden
						>
							–
						</div>
					)}
					<input
						ref={(el) => { inputRefs.current[idx] = el }}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={char}
						disabled={disabled}
						onChange={(e) => handleChange(idx, e.target.value)}
						onKeyDown={(e) => handleKeyDown(idx, e)}
						onPaste={handlePaste}
						onFocus={(e) => e.target.select()}
						className={cn(
							'flex h-10 w-10 items-center justify-center rounded-none border-[length:var(--border-width)] border-foreground bg-transparent text-center text-sm font-medium caret-transparent outline-none',
							'first-of-type:rounded-none',
							// No stacking: right border only on all-but-last boxes when not separated
							idx > 0 && idx % 3 !== 0 && '-ml-[length:var(--border-width)]',
							'focus:z-10 focus:border-foreground focus:ring-1 focus:ring-foreground/30',
							'disabled:cursor-not-allowed disabled:opacity-50',
						)}
						aria-label={`Digit ${idx + 1}`}
					/>
				</React.Fragment>
			))}
		</div>
	)
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn('flex items-center', className)}
			{...props}
		/>
	)
}

function InputOTPSlot({
	index,
	active,
	char,
	className,
}: {
	index: number
	active?: boolean
	char?: string
	className?: string
}) {
	return (
		<div
			data-slot="input-otp-slot"
			data-active={active}
			className={cn(
				'relative flex h-10 w-10 items-center justify-center rounded-none border-[length:var(--border-width)] border-foreground text-sm font-medium',
				index !== 0 && '-ml-[length:var(--border-width)]',
				active && 'z-10 ring-1 ring-foreground',
				className,
			)}
		>
			{char}
			{active && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
				</div>
			)}
		</div>
	)
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="input-otp-separator"
			role="separator"
			className={cn('flex w-4 items-center justify-center text-xs text-muted-foreground', className)}
			{...props}
		>
			–
		</div>
	)
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
