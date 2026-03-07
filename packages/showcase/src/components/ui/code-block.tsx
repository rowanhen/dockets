import * as React from 'react'
import { cn, leftPad } from '@/lib/utils'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
	({ children, className, ...props }, ref) => {
		return (
			<pre
				data-slot="code-block"
				ref={ref}
				className={cn(
					'block font-normal overflow-auto bg-[var(--receipt-bg)] scrollbar-none',
					className,
				)}
				{...props}
			>
				{String(children)
					.split('\n')
					.map((line, index) => (
						<div key={index} className="flex justify-between items-start">
							<span className="inline-flex w-[3ch] text-right pr-[1ch] select-none bg-[var(--bg-color)] opacity-50">
								{leftPad(String(index + 1), 3)}
							</span>
							<span className="min-w-[10%] w-full whitespace-pre bg-[var(--receipt-bg)] pl-[2ch]">
								{line}
							</span>
						</div>
					))}
			</pre>
		)
	},
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
