import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn('group/tabs flex flex-col gap-0', className)}
			{...props}
		/>
	)
}

const tabsListVariants = cva(
	'group/tabs-list flex w-full items-stretch rounded-[var(--radius)] text-foreground h-10 [&>*:not([role=tab])]:hidden',
	{
		variants: {
			variant: {
				default: 'border-[length:var(--border-width)] border-foreground',
				line: 'border-b-[length:var(--border-width)] border-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function TabsList({
	className,
	variant = 'default',
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	)
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				'flex-1 inline-flex items-center justify-center h-full text-xs font-medium uppercase tracking-wider whitespace-nowrap',
				'bg-card text-card-foreground',
				// Separator between tabs — single border drawn only once (no stacking)
				'[&:not(:first-child)]:border-l-[length:var(--border-width)] [&:not(:first-child)]:border-foreground',
				'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
				'data-active:bg-foreground data-active:text-background',
				'group-data-[variant=line]/tabs-list:border-l-0 group-data-[variant=line]/tabs-list:[&:not(:first-child)]:border-l-0',
				'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:text-foreground/60',
				'group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:border-b-2 group-data-[variant=line]/tabs-list:data-active:border-b-foreground',
				'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
				className,
			)}
			{...props}
		/>
	)
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn('flex-1 text-xs/relaxed outline-none', className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
