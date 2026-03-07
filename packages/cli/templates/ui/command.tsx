'use client'

import * as React from 'react'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandContextValue {
	query: string
	setQuery: (q: string) => void
}

const CommandContext = React.createContext<CommandContextValue>({
	query: '',
	setQuery: () => {},
})

function Command({ className, children, ...props }: React.ComponentProps<'div'>) {
	const [query, setQuery] = React.useState('')
	return (
		<CommandContext.Provider value={{ query, setQuery }}>
			<div
				data-slot="command"
				className={cn(
					'flex flex-col rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-popover text-popover-foreground',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</CommandContext.Provider>
	)
}

function CommandInput({ className, ...props }: React.ComponentProps<'input'>) {
	const { setQuery } = React.useContext(CommandContext)
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex items-center border-b-[length:var(--border-width)] border-foreground px-2"
		>
			<SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
			<input
				data-slot="command-input"
				type="text"
				role="combobox"
				autoComplete="off"
				autoCorrect="off"
				spellCheck={false}
				onChange={(e) => setQuery(e.target.value)}
				className={cn(
					'h-9 w-full bg-transparent px-2 text-xs placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				{...props}
			/>
		</div>
	)
}

function CommandList({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="command-list"
			role="listbox"
			className={cn('max-h-64 overflow-y-auto overflow-x-hidden', className)}
			{...props}
		/>
	)
}

function CommandEmpty({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="command-empty"
			className={cn('py-6 text-center text-xs text-muted-foreground', className)}
			{...props}
		/>
	)
}

function CommandGroup({ className, heading, children, ...props }: React.ComponentProps<'div'> & { heading?: string }) {
	return (
		<div data-slot="command-group" className={cn('py-1', className)} {...props}>
			{heading && (
				<div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
					{heading}
				</div>
			)}
			{children}
		</div>
	)
}

function CommandItem({ className, onSelect, children, ...props }: React.ComponentProps<'div'> & { onSelect?: () => void }) {
	return (
		<div
			data-slot="command-item"
			role="option"
			onClick={onSelect}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault()
					onSelect?.()
				}
			}}
			tabIndex={0}
			className={cn(
				'flex cursor-default select-none items-center gap-2 rounded-[var(--radius)] px-2 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

function CommandSeparator({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="command-separator"
			className={cn('-mx-1 h-[length:var(--border-width)] bg-border', className)}
			{...props}
		/>
	)
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn('ml-auto text-[10px] tracking-widest text-muted-foreground', className)}
			{...props}
		/>
	)
}

export {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandShortcut,
}
