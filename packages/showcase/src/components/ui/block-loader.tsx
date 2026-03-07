import * as React from 'react'
import { cn } from '@/lib/utils'

const SEQUENCES = [
	['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
	['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
	['▖', '▘', '▝', '▗'],
	['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▁'],
	['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊', '▉'],
	['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
	['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
	['◢', '◣', '◤', '◥'],
	['◰', '◳', '◲', '◱'],
	['◴', '◷', '◶', '◵'],
	['◐', '◓', '◑', '◒'],
] as const

interface BlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	mode?: number
}

function BlockLoader({ mode = 1, className, ...props }: BlockLoaderProps) {
	const sequence = SEQUENCES[mode] ?? SEQUENCES[0]
	const [index, setIndex] = React.useState(0)

	React.useEffect(() => {
		const id = window.setInterval(() => {
			setIndex((prev) => (prev + 1) % sequence.length)
		}, 100)
		return () => clearInterval(id)
	}, [sequence.length])

	return (
		<span data-slot="block-loader" className={cn('inline-block w-[1em] text-center', className)} aria-label="Loading" {...props}>
			{sequence[index]}
		</span>
	)
}

export { BlockLoader, SEQUENCES }
