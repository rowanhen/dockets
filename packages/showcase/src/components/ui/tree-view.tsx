import * as React from 'react'
import { cn } from '@/lib/utils'

interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
	defaultValue?: boolean
	depth?: number
	isFile?: boolean
	isLastChild?: boolean
	isRoot?: boolean
	parentLines?: boolean[]
	title: string
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
	(
		{
			defaultValue = false,
			title,
			children,
			depth = 0,
			isFile = false,
			isLastChild = false,
			parentLines = [],
			className,
			...props
		},
		ref,
	) => {
		const [show, setShow] = React.useState<boolean>(defaultValue)

		const onToggleShow = (): void => {
			if (!isFile) setShow((prevShow) => !prevShow)
		}

		const hasChildren = React.Children.count(children) > 0

		const spacing = parentLines.map((line) => (line ? '│ . ' : '. . ')).join('')
		const endPrefix = isLastChild ? '└───' : '├───'
		const prefix = `${spacing}${endPrefix}`
		const icon = isFile ? ' ' : show ? '╦ ' : '╤ '

		const updatedParentLines = [...parentLines, !isLastChild]

		return (
			<div ref={ref} data-slot="tree-view" className={cn('whitespace-nowrap', className)} {...props}>
				<div
					tabIndex={0}
					role="button"
					onClick={onToggleShow}
					className="cursor-pointer border-0"
					aria-expanded={show}
				>
					{prefix}
					{icon}
					{title}
				</div>
				{show && hasChildren && (
					<div>
						{React.Children.map(children, (child, index) =>
							React.isValidElement(child)
								? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
										depth: depth + 1,
										isLastChild: index === React.Children.count(children) - 1,
										parentLines: updatedParentLines,
									})
								: child,
						)}
					</div>
				)}
			</div>
		)
	},
)
TreeView.displayName = 'TreeView'

export { TreeView }
