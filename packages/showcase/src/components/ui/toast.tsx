'use client'

// Lightweight toast system — no sonner dependency.
// Usage:
//   1. Wrap your app with <ToastProvider />
//   2. Call useToast() to get the `toast` function
//   3. <Toaster /> renders the stack (add to your root layout)

import * as React from 'react'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'default' | 'destructive' | 'success'

export interface ToastData {
	id: string
	title?: string
	description?: string
	variant?: ToastVariant
	duration?: number
}

interface ToastContextValue {
	toasts: ToastData[]
	toast: (opts: Omit<ToastData, 'id'>) => void
	dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue>({
	toasts: [],
	toast: () => {},
	dismiss: () => {},
})

function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = React.useState<ToastData[]>([])

	const toast = React.useCallback((opts: Omit<ToastData, 'id'>) => {
		const id = Math.random().toString(36).slice(2)
		setToasts((prev) => [...prev, { ...opts, id }])
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, opts.duration ?? 4000)
	}, [])

	const dismiss = React.useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}, [])

	return (
		<ToastContext.Provider value={{ toasts, toast, dismiss }}>
			{children}
		</ToastContext.Provider>
	)
}

function useToast() {
	return React.useContext(ToastContext)
}

const variantClasses: Record<ToastVariant, string> = {
	default: 'border-foreground bg-card text-card-foreground',
	destructive: 'border-destructive bg-destructive/10 text-destructive',
	success: 'border-foreground bg-foreground text-background',
}

function Toast({
	title,
	description,
	variant = 'default',
	onDismiss,
	className,
}: Omit<ToastData, 'id'> & {
	onDismiss?: () => void
	className?: string
}) {
	return (
		<div
			data-slot="toast"
			role="status"
			aria-live="polite"
			className={cn(
				'relative flex w-full max-w-sm flex-col gap-1 rounded-[var(--radius)] border-[length:var(--border-width)] p-3 text-xs/relaxed shadow-none',
				variantClasses[variant],
				className,
			)}
		>
			{title && (
				<div
					data-slot="toast-title"
					className="font-medium uppercase tracking-wider"
				>
					{title}
				</div>
			)}
			{description && (
				<div data-slot="toast-description" className="text-xs/relaxed opacity-90">
					{description}
				</div>
			)}
			{onDismiss && (
				<button
					type="button"
					onClick={onDismiss}
					className="absolute top-2 right-2 flex size-5 items-center justify-center opacity-60 hover:opacity-100"
					aria-label="Dismiss"
				>
					<XIcon className="size-3.5" />
				</button>
			)}
		</div>
	)
}

function Toaster({ className }: { className?: string }) {
	const { toasts, dismiss } = useToast()
	if (toasts.length === 0) return null
	return (
		<div
			data-slot="toaster"
			className={cn(
				'fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 sm:bottom-4 sm:right-4',
				className,
			)}
		>
			{toasts.map((t) => (
				<Toast
					key={t.id}
					title={t.title}
					description={t.description}
					variant={t.variant}
					onDismiss={() => dismiss(t.id)}
				/>
			))}
		</div>
	)
}

export { ToastProvider, Toaster, Toast, useToast }
