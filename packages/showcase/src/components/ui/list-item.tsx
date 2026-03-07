import * as React from 'react'
import { cn, findNextFocusable } from '@/lib/utils'

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
	({ children, className, ...props }, ref) => {
		const itemRef = React.useRef<HTMLLIElement>(null)
		const combinedRef = ref || itemRef

		const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
			switch (event.key) {
				case 'Enter':
					event.preventDefault()
					;(combinedRef as React.RefObject<HTMLLIElement>).current?.click()
					break
				case 'ArrowUp':
				case 'ArrowLeft': {
					event.preventDefault()
					const previousFocusable = findNextFocusable(document.activeElement, 'previous')
					previousFocusable?.focus()
					break
				}
				case 'ArrowDown':
				case 'ArrowRight': {
					event.preventDefault()
					const nextFocusable = findNextFocusable(document.activeElement, 'next')
					nextFocusable?.focus()
					break
				}
			}
		}

		return (
			<li
				ref={combinedRef}
				data-slot="list-item"
				className={cn('pl-[1ch]', className)}
				tabIndex={0}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{children}
			</li>
		)
	},
)
ListItem.displayName = 'ListItem'

export { ListItem }
