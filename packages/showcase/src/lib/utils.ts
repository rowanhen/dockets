import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function leftPad(input: string, length: number): string {
	const zerosNeeded = length - input.length
	if (zerosNeeded <= 0) {
		return input
	}
	return '0'.repeat(zerosNeeded) + input
}

export function findNextFocusable(
	element: Element | null,
	direction: 'next' | 'previous' = 'next'
): HTMLElement | null {
	if (!element) return null

	const focusableSelectors = [
		'a[href]',
		'button',
		'input',
		'select',
		'textarea',
		'[tabindex]:not([tabindex="-1"])',
		'[contenteditable="true"]',
	]

	const focusableElements = Array.from(
		document.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
	)

	const currentIndex = focusableElements.indexOf(element as HTMLElement)

	if (currentIndex !== -1) {
		const nextIndex =
			direction === 'next'
				? (currentIndex + 1) % focusableElements.length
				: (currentIndex - 1 + focusableElements.length) %
					focusableElements.length

		return focusableElements[nextIndex]
	}

	return null
}
