import { useState } from 'react'
import { MailIcon, SettingsIcon, TrashIcon, CopyIcon, PencilIcon, StarIcon, ZapIcon, GlobeIcon, ShieldIcon, BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, CheckCircle2Icon } from 'lucide-react'

import { BlockLoader, SEQUENCES } from '@/components/block-loader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'

import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { FormInput } from '@/components/form-input'
import { Select } from '@/components/select'
import { Combobox } from '@/components/combobox'
import { Accordion } from '@/components/accordion'
import { Tabs } from '@/components/tabs'
import { Dialog } from '@/components/dialog'
import { DropdownMenu } from '@/components/dropdown-menu'
import { Tooltip } from '@/components/tooltip'
import { List } from '@/components/list'
import { Breadcrumb } from '@/components/breadcrumb'
import { Divider, SectionLabel, Row, DataTable, Glyph, Ledger } from '@/components/receipt'
import {
	CellGrid,
	CellRow,
	StatCell,
	BentoSplit,
	BentoLeader,
	BentoQuad,
	BentoTriple,
	HeroPrimary,
	HeroSecondary,
} from '@/components/layouts'

// ── New component imports ──────────────────────────────────────────────────
// Form controls
import { CheckboxField } from '@/components/checkbox'
import { SwitchField } from '@/components/switch'
import { RadioGroupField } from '@/components/radio-group'
import { Slider as LabelledSlider } from '@/components/slider'
import { InputOTP } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
// Data display
import { Alert as SimpleAlert } from '@/components/alert'
import { UserAvatar } from '@/components/avatar'
import { Card as SimpleCard } from '@/components/card'
import { DataTable as TableDataTable } from '@/components/table'
import { Progress as LabelledProgress } from '@/components/progress'
import { SkeletonCard, Skeleton, SkeletonText } from '@/components/skeleton'
import { Calendar } from '@/components/ui/calendar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { CodeBlock } from '@/components/code-block'
import { TreeView } from '@/components/ui/tree-view'
// Overlays & popovers
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/alert-dialog'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/sheet'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/drawer'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/popover'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/hover-card'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@/components/context-menu'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/command'
// Toggle & interactive
import { Toggle } from '@/components/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import { CollapsibleSection, Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/collapsible'
// Navigation
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '@/components/menubar'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/navigation-menu'
// Layout
import { Stack, Row as LayoutRow, Grid, BentoGrid, BentoCell } from '@/components/layout-primitives'
import { CarouselRoot, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/carousel'
import { ScrollArea } from '@/components/scroll-area'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/resizable'
// Feedback
import { ToastProvider, Toaster, useToast } from '@/components/toast'

/* ═══════════════════════════════════════════════════════════════════════════ */

function SectionHeading({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[10px] uppercase text-[var(--muted-color)] tracking-wider mb-4">
			// {children}
		</div>
	)
}

function ExampleBlock({ label, children }: { label?: string; children: React.ReactNode }) {
	return (
		<div className="border border-[var(--border-subtle)] p-4">
			{label && (
				<div className="text-[10px] uppercase text-[var(--muted-color)] mb-3">{label}</div>
			)}
			{children}
		</div>
	)
}

function LogoBrandSection() {
	return (
		<section>
			<SectionHeading>logo &amp; brand</SectionHeading>

			<div className="space-y-8">
				{/* Logo mark */}
				<ExampleBlock label="Logo mark">
					<div className="flex flex-wrap gap-8 items-end">
						<div className="flex flex-col items-center gap-2">
							<Logo className="w-24 h-24" />
							<span className="text-[10px] text-[var(--muted-color)]">96px</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Logo className="w-12 h-12" />
							<span className="text-[10px] text-[var(--muted-color)]">48px</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Logo className="w-6 h-6" />
							<span className="text-[10px] text-[var(--muted-color)]">24px</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Logo className="w-4 h-4" />
							<span className="text-[10px] text-[var(--muted-color)]">16px</span>
						</div>
					</div>
				</ExampleBlock>

				{/* Wordmark */}
				<ExampleBlock label="Wordmark">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Logo className="w-6 h-6" />
							<span className="font-bold text-lg">LEITWARE</span>
						</div>
						<div className="flex items-center gap-2">
							<Logo className="w-4 h-4" />
							<span className="font-bold text-xs">LEITWARE</span>
						</div>
					</div>
				</ExampleBlock>

				{/* On different backgrounds */}
				<ExampleBlock label="On backgrounds">
					<div className="grid md:grid-cols-3 gap-4">
						<div className="bg-[var(--receipt-bg)] border p-6 flex items-center justify-center gap-3">
							<Logo className="w-8 h-8" />
							<span className="font-bold text-sm">LEITWARE</span>
						</div>
						<div className="bg-[var(--border-color)] text-[var(--receipt-bg)] p-6 flex items-center justify-center gap-3">
							<Logo className="w-8 h-8" />
							<span className="font-bold text-sm">LEITWARE</span>
						</div>
						<div className="bg-[var(--accent-color)] text-[var(--receipt-bg)] p-6 flex items-center justify-center gap-3">
							<Logo className="w-8 h-8" />
							<span className="font-bold text-sm">LEITWARE</span>
						</div>
					</div>
				</ExampleBlock>

				{/* Brand details */}
				<ExampleBlock label="Brand details">
					<div className="grid md:grid-cols-2 gap-6 text-xs">
						<div className="space-y-3">
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Name</div>
								<div className="font-bold">LEITWARE</div>
							</div>
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Typeface</div>
								<div>IBM Plex Mono (all weights, all contexts)</div>
							</div>
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Treatment</div>
								<div>Always uppercase. Always tracked (<code className="text-[var(--accent-color)]">tracking-wider</code>).</div>
							</div>
						</div>
						<div className="space-y-3">
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Klein colors (per theme)</div>
								<div className="flex gap-3">
									<div className="flex items-center gap-1.5">
										<div className="w-4 h-4 border" style={{ backgroundColor: 'rgb(255, 94, 0)' }} />
										<span>Light</span>
									</div>
									<div className="flex items-center gap-1.5">
										<div className="w-4 h-4 border" style={{ backgroundColor: 'rgb(0, 255, 0)' }} />
										<span>Dark</span>
									</div>
									<div className="flex items-center gap-1.5">
										<div className="w-4 h-4 border" style={{ backgroundColor: 'rgb(130, 177, 255)' }} />
										<span>Deep</span>
									</div>
								</div>
							</div>
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Logo construction</div>
								<div>SVG. 24x24 viewBox. 6 rectangles forming a grid/ledger motif. Uses <code className="text-[var(--accent-color)]">currentColor</code>.</div>
							</div>
							<div>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-1">Minimum size</div>
								<div>16px (below this the lines merge)</div>
							</div>
						</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function SpacingSection() {
	const spacingScale = [
		{ class: 'gap-px', value: '1px', desc: 'border lines' },
		{ class: 'gap-1', value: '4px', desc: 'tight inline' },
		{ class: 'gap-2', value: '8px', desc: 'compact' },
		{ class: 'gap-3', value: '12px', desc: 'form fields' },
		{ class: 'gap-4', value: '16px', desc: 'default' },
		{ class: 'gap-6', value: '24px', desc: 'half grid' },
		{ class: 'gap-8', value: '32px', desc: 'section inner' },
		{ class: 'gap-12', value: '48px', desc: 'grid unit' },
		{ class: 'gap-16', value: '64px', desc: 'section outer' },
	]

	return (
		<section>
			<SectionHeading>spacing &amp; grid system</SectionHeading>

			<div className="space-y-8">
				{/* Core measurements */}
				<div className="space-y-4">
					<div className="text-xs font-bold uppercase">Core Measurements</div>
					<div className="grid md:grid-cols-3 gap-4">
						<div className="border p-4 space-y-1">
							<div className="text-xl font-bold">48px</div>
							<div className="text-xs text-[var(--muted-color)]">Base grid unit</div>
							<div className="text-[10px] text-[var(--muted-color)]">
								The foundational measurement. Visible as the background grid.
							</div>
						</div>
						<div className="border p-4 space-y-1">
							<div className="text-xl font-bold">1152px</div>
							<div className="text-xs text-[var(--muted-color)]">Max-width (24 x 48px)</div>
							<div className="text-[10px] text-[var(--muted-color)]">
								The <code className="text-[var(--accent-color)]">.wrap</code> utility.
							</div>
						</div>
						<div className="border p-4 space-y-1">
							<div className="text-xl font-bold">24px</div>
							<div className="text-xs text-[var(--muted-color)]">Container padding</div>
							<div className="text-[10px] text-[var(--muted-color)]">
								Half grid unit. Used as <code className="text-[var(--accent-color)]">px-6</code>.
							</div>
						</div>
					</div>
				</div>

				{/* 48px grid demo */}
				<ExampleBlock label="48px grid alignment">
					<div
						className="relative border border-dashed border-[var(--muted-color)] h-[144px]"
						style={{
							backgroundImage:
								'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
							backgroundSize: '48px 48px',
						}}
					>
						<div className="absolute left-0 top-0 w-[48px] h-[48px] bg-[var(--accent-color)] opacity-20" />
						<div className="absolute left-0 top-0 w-[48px] h-[48px] border border-[var(--accent-color)] flex items-center justify-center text-[10px]">
							48px
						</div>
						<div className="absolute left-[48px] top-0 w-[96px] h-[48px] border border-[var(--accent-color)] opacity-40 flex items-center justify-center text-[10px]">
							2 units
						</div>
					</div>
				</ExampleBlock>

				{/* Spacing scale */}
				<ExampleBlock label="Tailwind spacing scale">
					<div className="space-y-2">
						{spacingScale.map((s) => (
							<div key={s.class} className="flex items-center gap-4 text-xs">
								<code className="w-[10ch] shrink-0 text-[var(--accent-color)]">{s.class}</code>
								<div
									className="bg-[var(--accent-color)] h-3 shrink-0"
									style={{ width: s.value }}
								/>
								<span className="w-[6ch] shrink-0">{s.value}</span>
								<span className="text-[var(--muted-color)]">{s.desc}</span>
							</div>
						))}
					</div>
				</ExampleBlock>

				{/* Gap-as-border */}
				<ExampleBlock label="Gap-as-border system">
					<div className="space-y-3">
						<div className="text-[10px] text-[var(--muted-color)]">
							Container: <code className="text-[var(--accent-color)]">bg-[var(--border-color)] gap-px</code>
							{' '}/ Children: <code className="text-[var(--accent-color)]">bg-[var(--receipt-bg)]</code>
						</div>
						<div className="bg-[var(--border-color)] gap-px grid grid-cols-3 border border-[var(--border-color)]">
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 1</div>
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 2</div>
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 3</div>
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 4</div>
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 5</div>
							<div className="bg-[var(--receipt-bg)] p-4 text-xs text-center">Cell 6</div>
						</div>
						<div className="text-[10px] text-[var(--muted-color)]">
							Gap IS the border. Never add <code className="text-[var(--accent-color)]">border</code> to cells.
						</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function ColorTokensSection() {
	const themeVars = [
		{ label: 'Background', vars: [
			{ name: '--bg-color', desc: 'Page background' },
			{ name: '--receipt-bg', desc: 'Card/surface background' },
		]},
		{ label: 'Text', vars: [
			{ name: '--text-color', desc: 'Primary text' },
			{ name: '--muted-color', desc: 'Muted/secondary text' },
		]},
		{ label: 'Borders', vars: [
			{ name: '--border-color', desc: 'Primary border' },
			{ name: '--border-subtle', desc: 'Subtle/light border' },
		]},
		{ label: 'Interactive', vars: [
			{ name: '--hover-bg', desc: 'Hover state' },
			{ name: '--accent-color', desc: 'Klein accent' },
		]},
		{ label: 'Grid', vars: [
			{ name: '--grid-color', desc: 'Grid lines' },
		]},
	]

	const semanticVars = [
		{ name: '--primary', fg: '--primary-foreground', label: 'Primary' },
		{ name: '--secondary', fg: '--secondary-foreground', label: 'Secondary' },
		{ name: '--muted', fg: '--muted-foreground', label: 'Muted' },
		{ name: '--accent', fg: '--accent-foreground', label: 'Accent' },
		{ name: '--destructive', fg: '--destructive-foreground', label: 'Destructive' },
	]

	return (
		<section>
			<SectionHeading>color tokens</SectionHeading>

			<div className="space-y-8">
				<div className="text-xs text-[var(--muted-color)]">
					2 themes: <strong>light</strong> / <strong>dark</strong>.
					Toggle with <ThemeToggle /> to see swatches update.
				</div>

				{/* Theme variables */}
				<ExampleBlock label="Theme variables">
					<div className="space-y-4">
						{themeVars.map((group) => (
							<div key={group.label}>
								<div className="text-[10px] uppercase text-[var(--muted-color)] mb-2">{group.label}</div>
								<div className="flex flex-wrap gap-3">
									{group.vars.map((v) => (
										<div key={v.name} className="flex items-center gap-2">
											<div
												className="w-8 h-8 border border-[var(--border-color)] shrink-0"
												style={{ backgroundColor: `var(${v.name})` }}
											/>
											<div>
												<code className="text-[10px] block">{v.name}</code>
												<div className="text-[10px] text-[var(--muted-color)]">{v.desc}</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</ExampleBlock>

				{/* Semantic tokens */}
				<ExampleBlock label="Semantic tokens (shadcn)">
					<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
						{semanticVars.map((s) => (
							<div key={s.name} className="border border-[var(--border-subtle)]">
								<div
									className="h-10 flex items-center justify-center text-[10px] font-bold"
									style={{
										backgroundColor: `var(${s.name})`,
										color: `var(${s.fg})`,
									}}
								>
									{s.label}
								</div>
								<div className="px-2 py-1">
									<code className="text-[10px] block">{s.name}</code>
									<code className="text-[10px] block text-[var(--muted-color)]">{s.fg}</code>
								</div>
							</div>
						))}
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function TypographySection() {
	const sizes = [
		{ class: 'text-3xl', label: '3xl', px: '30px' },
		{ class: 'text-2xl', label: '2xl', px: '24px' },
		{ class: 'text-xl', label: 'xl', px: '20px' },
		{ class: 'text-lg', label: 'lg', px: '18px' },
		{ class: 'text-base', label: 'base', px: '16px' },
		{ class: 'text-sm', label: 'sm', px: '14px' },
		{ class: 'text-xs', label: 'xs', px: '12px' },
	]

	return (
		<section>
			<SectionHeading>typography</SectionHeading>

			<div className="space-y-8">
				<div className="space-y-4">
					<div className="text-xs font-bold uppercase">IBM Plex Mono</div>
					<div className="text-xs text-[var(--muted-color)]">
						The only font. Monospace everywhere. Line-height: 1.3 (compact). Base size: 14px.
					</div>
				</div>

				{/* Size scale */}
				<ExampleBlock label="Size scale">
					<div className="space-y-3">
						{sizes.map((s) => (
							<div key={s.class} className="flex items-baseline gap-4">
								<code className="text-[10px] w-[10ch] shrink-0 text-[var(--accent-color)]">{s.class}</code>
								<span className="text-[10px] w-[4ch] shrink-0 text-[var(--muted-color)]">{s.px}</span>
								<span className={s.class}>The quick brown fox</span>
							</div>
						))}
					</div>
				</ExampleBlock>

				{/* Weights */}
				<ExampleBlock label="Weights">
					<div className="space-y-2 text-sm">
						<div className="font-normal">font-normal (400) — Body text and descriptions</div>
						<div className="font-medium">font-medium (500) — Labels and field names</div>
						<div className="font-bold">font-bold (700) — Headings and emphasis</div>
					</div>
				</ExampleBlock>

				{/* Conventions */}
				<ExampleBlock label="Conventions">
					<div className="space-y-3">
						<div>
							<div className="text-[10px] text-[var(--muted-color)] mb-1">UPPERCASE + tracking-wider (labels)</div>
							<div className="text-xs font-medium uppercase tracking-wider">Section Label</div>
						</div>
						<Separator />
						<div>
							<div className="text-[10px] text-[var(--muted-color)] mb-1">Muted description text</div>
							<div className="text-[10px] text-muted-foreground">Descriptions use text-[10px] text-muted-foreground</div>
						</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function ButtonsSection() {
	return (
		<section>
			<SectionHeading>buttons</SectionHeading>

			<div className="space-y-8">
				{/* Variants */}
				<ExampleBlock label="Variants">
					<div className="flex flex-wrap gap-3 items-center">
						<Button variant="default">Default</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</div>
				</ExampleBlock>

				{/* Sizes */}
				<ExampleBlock label="Sizes">
					<div className="flex flex-wrap gap-3 items-center">
						<Button size="sm">Small</Button>
						<Button size="default">Default</Button>
						<Button size="lg">Large</Button>
						<Button size="xl">Extra Large</Button>
						<Button size="icon"><StarIcon /></Button>
					</div>
				</ExampleBlock>

				{/* Disabled */}
				<ExampleBlock label="Disabled">
					<div className="flex flex-wrap gap-3 items-center">
						<Button disabled>Disabled Default</Button>
						<Button variant="outline" disabled>Disabled Outline</Button>
						<Button variant="destructive" disabled>Disabled Destructive</Button>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function BadgeSection() {
	return (
		<section>
			<SectionHeading>badges</SectionHeading>

			<ExampleBlock label="Variants">
				<div className="flex flex-wrap gap-3 items-center">
					<Badge variant="default">Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="ghost">Ghost</Badge>
					<Badge variant="link">Link</Badge>
				</div>
			</ExampleBlock>
		</section>
	)
}

function BlockLoaderSection() {
	return (
		<section>
			<SectionHeading>block loader</SectionHeading>

			<div className="space-y-8">
				<ExampleBlock label="All modes">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{SEQUENCES.map((_, i) => (
							<div key={i} className="flex items-center gap-3 text-xs">
								<BlockLoader mode={i} className="text-base" />
								<span className="text-[var(--muted-color)]">mode={i}</span>
							</div>
						))}
					</div>
				</ExampleBlock>

				<ExampleBlock label="Inline with text">
					<div className="space-y-2 text-xs">
						<div>Loading deployment <BlockLoader mode={1} /></div>
						<div>Fetching channels <BlockLoader mode={3} /></div>
						<div>Provisioning <BlockLoader mode={6} /></div>
					</div>
				</ExampleBlock>

				<ExampleBlock label="Centered (page-level loading)">
					<div className="flex items-center justify-center py-8">
						<BlockLoader mode={1} className="text-xl" />
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function FormInputsSection() {
	return (
		<section>
			<SectionHeading>form inputs</SectionHeading>

			<div className="space-y-8">
				<ExampleBlock label="FormInput states">
					<div className="grid md:grid-cols-3 gap-4">
						<FormInput label="Email" placeholder="you@example.com" description="Your work email address" />
						<FormInput label="API Key" placeholder="sk-..." required />
						<FormInput label="Name" placeholder="..." error="Name is required" defaultValue="" />
					</div>
				</ExampleBlock>

				<ExampleBlock label="Textarea">
					<Textarea placeholder="Enter a longer description..." />
				</ExampleBlock>

				<ExampleBlock label="InputGroup with addons">
					<div className="space-y-3 max-w-md">
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText><MailIcon className="w-4 h-4" /></InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="Email address" />
						</InputGroup>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText>https://</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="yoursite.com" />
						</InputGroup>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function SelectSection() {
	return (
		<section>
			<SectionHeading>select</SectionHeading>

			<div className="space-y-8">
				<ExampleBlock label="Flat options">
					<div className="max-w-xs">
						<Select
							label="Region"
							placeholder="Choose region..."
							options={[
								{ value: 'us-east', label: 'US East (NYC)' },
								{ value: 'us-west', label: 'US West (SFO)' },
								{ value: 'eu-west', label: 'EU West (AMS)' },
								{ value: 'ap-south', label: 'AP South (SGP)' },
							]}
						/>
					</div>
				</ExampleBlock>

				<ExampleBlock label="Grouped options">
					<div className="max-w-xs">
						<Select
							label="Instance Size"
							placeholder="Choose size..."
							groups={[
								{
									label: 'Standard',
									options: [
										{ value: 's-1', label: '1 vCPU / 1 GB' },
										{ value: 's-2', label: '2 vCPU / 4 GB' },
									],
								},
								{
									label: 'Performance',
									options: [
										{ value: 'p-4', label: '4 vCPU / 8 GB' },
										{ value: 'p-8', label: '8 vCPU / 16 GB' },
									],
								},
							]}
						/>
					</div>
				</ExampleBlock>

				<ExampleBlock label="With error">
					<div className="max-w-xs">
						<Select
							label="Provider"
							placeholder="Choose..."
							error="A provider is required"
							options={[
								{ value: 'do', label: 'DigitalOcean' },
								{ value: 'aws', label: 'AWS' },
							]}
						/>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function ComboboxSection() {
	const [comboValue, setComboValue] = useState<string[]>(['next', 'react'])

	const frameworkOptions = [
		{ value: 'next', label: 'Next.js', icon: <GlobeIcon className="w-3 h-3" />, description: 'React framework' },
		{ value: 'react', label: 'React', icon: <ZapIcon className="w-3 h-3" />, description: 'UI library' },
		{ value: 'vue', label: 'Vue', icon: <GlobeIcon className="w-3 h-3" />, description: 'Progressive framework' },
		{ value: 'svelte', label: 'Svelte', icon: <ZapIcon className="w-3 h-3" />, description: 'Compiler-based' },
		{ value: 'angular', label: 'Angular', icon: <ShieldIcon className="w-3 h-3" />, description: 'Google framework' },
	]

	return (
		<section>
			<SectionHeading>combobox</SectionHeading>

			<ExampleBlock label="Multi-select with chips, search, icons">
				<div className="max-w-md">
					<Combobox
						label="Frameworks"
						options={frameworkOptions}
						value={comboValue}
						onValueChange={setComboValue}
						placeholder="Search frameworks..."
					/>
				</div>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function AccordionSection() {
	return (
		<section>
			<SectionHeading>accordion</SectionHeading>

			<ExampleBlock label="Data-driven (items API, all open by default)">
				<div className="max-w-lg">
					<Accordion
						items={[
							{
								value: 'architecture',
								trigger: 'Component Architecture',
								content: 'Opinionated wrappers over shadcn primitives. Pages import from @/components/, never @/components/ui/.',
							},
							{
								value: 'grid',
								trigger: '48px Grid System',
								content: 'Everything aligns to a 48px base grid. Max-width is 1152px (24 units). Container padding is 24px (half unit).',
							},
							{
								value: 'themes',
								trigger: 'Two Themes',
								content: 'Light (orange accent), Dark (green accent). All via CSS custom properties.',
							},
						]}
					/>
				</div>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function TabsSection() {
	return (
		<section>
			<SectionHeading>tabs</SectionHeading>

			<div className="space-y-8">
				<ExampleBlock label="Default variant (blocky filled — matches account sub-nav)">
					<Tabs
						defaultValue="overview"
						items={[
							{ value: 'overview', label: 'Overview', content: <div className="text-xs p-4 border border-t-0">Overview content goes here. Active tab is inverted (bg-foreground text-background).</div> },
							{ value: 'config', label: 'Config', content: <div className="text-xs p-4 border border-t-0">Configuration options panel.</div> },
							{ value: 'logs', label: 'Logs', content: <div className="text-xs p-4 border border-t-0">Log output stream.</div> },
							{ value: 'disabled', label: 'Disabled', content: <div className="text-xs p-4 border border-t-0">—</div>, disabled: true },
						]}
					/>
				</ExampleBlock>

				<ExampleBlock label="Line variant (underline indicator)">
					<Tabs
						variant="line"
						defaultValue="deploy"
						items={[
							{ value: 'deploy', label: 'Deploy', content: <div className="text-xs pt-4">Deployment pipeline view.</div> },
							{ value: 'monitor', label: 'Monitor', content: <div className="text-xs pt-4">Health monitoring dashboard.</div> },
							{ value: 'settings', label: 'Settings', content: <div className="text-xs pt-4">App settings panel.</div> },
						]}
					/>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function DialogSection() {
	return (
		<section>
			<SectionHeading>dialog</SectionHeading>

			<ExampleBlock label="Trigger + title + description + footer">
				<Dialog
					trigger={<Button variant="outline">Open Dialog</Button>}
					title="Confirm Deployment"
					description="This will deploy the current build to production. This action cannot be undone."
					footer={
						<div className="flex gap-2 justify-end">
							<Button variant="ghost">Cancel</Button>
							<Button>Deploy</Button>
						</div>
					}
				>
					<div className="text-xs text-[var(--muted-color)] py-2">
						Build: <code>abc123f</code> / Region: US-EAST-1
					</div>
				</Dialog>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function DropdownMenuSection() {
	return (
		<section>
			<SectionHeading>dropdown menu</SectionHeading>

			<ExampleBlock label="Items with icons, destructive variant, separators">
				<DropdownMenu
					trigger={<Button variant="outline">Actions</Button>}
					items={[
						{ label: 'Edit', icon: <PencilIcon className="w-4 h-4" />, onClick: () => {} },
						{ label: 'Copy', icon: <CopyIcon className="w-4 h-4" />, onClick: () => {} },
						{ label: 'Settings', icon: <SettingsIcon className="w-4 h-4" />, onClick: () => {} },
						{ separator: true },
						{ label: 'Delete', icon: <TrashIcon className="w-4 h-4" />, variant: 'destructive', onClick: () => {} },
					]}
				/>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function TooltipSection() {
	return (
		<section>
			<SectionHeading>tooltip</SectionHeading>

			<ExampleBlock label="Various sides">
				<div className="flex flex-wrap gap-4 items-center">
					<Tooltip content="Top tooltip" side="top">
						<Button variant="outline" size="sm">Top</Button>
					</Tooltip>
					<Tooltip content="Bottom tooltip" side="bottom">
						<Button variant="outline" size="sm">Bottom</Button>
					</Tooltip>
					<Tooltip content="Left tooltip" side="left">
						<Button variant="outline" size="sm">Left</Button>
					</Tooltip>
					<Tooltip content="Right tooltip" side="right">
						<Button variant="outline" size="sm">Right</Button>
					</Tooltip>
				</div>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function ReceiptPrimitivesSection() {
	return (
		<section>
			<SectionHeading>receipt primitives</SectionHeading>

			<div className="space-y-8">
				{/* Divider */}
				<ExampleBlock label="Divider (dots, dashes, equals)">
					<div className="space-y-2">
						<Divider variant="dots" />
						<Divider variant="dashes" />
						<Divider variant="equals" />
					</div>
				</ExampleBlock>

				{/* SectionLabel */}
				<ExampleBlock label="SectionLabel (default, bordered)">
					<div className="space-y-3">
						<SectionLabel>Default (inverted)</SectionLabel>
						<SectionLabel variant="bordered">Bordered (transparent)</SectionLabel>
					</div>
				</ExampleBlock>

				{/* Row */}
				<ExampleBlock label="Row">
					<div className="space-y-1 max-w-sm">
						<Row label="Service" value="OpenClaw Deploy" />
						<Row label="Region" value="NYC1" fill />
						<Row label="Total" value="$24.00" bold />
					</div>
				</ExampleBlock>

				{/* DataTable */}
				<ExampleBlock label="DataTable">
					<div className="max-w-md">
						<DataTable
							columns={[
								{ label: 'Service', width: 20 },
								{ label: 'Region', width: 10 },
								{ label: 'Cost', align: 'right' },
							]}
							rows={[
								['Web Server', 'NYC1', '$12.00'],
								['Database', 'NYC1', '$24.00'],
								['CDN', 'Global', '$6.00'],
							]}
						/>
					</div>
				</ExampleBlock>

				{/* Glyph */}
				<ExampleBlock label="Glyph (variants and sizes)">
					<div className="space-y-4">
						<div className="text-[10px] text-[var(--muted-color)] mb-1">Variants (size 48)</div>
						<div className="flex gap-3 items-center">
							<Glyph variant="default">A</Glyph>
							<Glyph variant="filled">B</Glyph>
							<Glyph variant="circle">C</Glyph>
							<Glyph variant="circle-inverted">D</Glyph>
						</div>
						<div className="text-[10px] text-[var(--muted-color)] mb-1">Sizes (default variant)</div>
						<div className="flex gap-3 items-end">
							<Glyph size={16}>S</Glyph>
							<Glyph size={24}>M</Glyph>
							<Glyph size={32}>L</Glyph>
							<Glyph size={48}>XL</Glyph>
							<Glyph size={64}>2X</Glyph>
							<Glyph size={96}>3X</Glyph>
						</div>
					</div>
				</ExampleBlock>

				{/* Ledger */}
				<ExampleBlock label="Ledger">
					<div className="max-w-sm">
						<Ledger
							title="Monthly Invoice"
							rows={[
								{ label: 'Compute', value: '$48.00', fill: true },
								{ label: 'Storage', value: '$12.00', fill: true },
								{ label: 'Bandwidth', value: '$6.00', fill: true },
							]}
							total={{ label: 'Total', value: '$66.00' }}
						/>
					</div>
				</ExampleBlock>

				</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function ListsSection() {
	const items = [
		{ content: 'Automated provisioning via Convex' },
		{ content: 'Zero-downtime deployments' },
		{ content: 'Built-in monitoring and alerts' },
	]

	return (
		<section>
			<SectionHeading>lists</SectionHeading>

			<ExampleBlock label="Arrow, check, check-bordered, bullet">
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<div className="text-[10px] uppercase text-[var(--muted-color)] mb-2">Arrow</div>
						<List variant="arrow" items={items} />
					</div>
					<div>
						<div className="text-[10px] uppercase text-[var(--muted-color)] mb-2">Check</div>
						<List variant="check" items={items} />
					</div>
					<div>
						<div className="text-[10px] uppercase text-[var(--muted-color)] mb-2">Check-bordered</div>
						<List variant="check-bordered" items={items} />
					</div>
					<div>
						<div className="text-[10px] uppercase text-[var(--muted-color)] mb-2">Bullet</div>
						<List variant="bullet" items={items} />
					</div>
				</div>
			</ExampleBlock>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function LayoutsSection() {
	return (
		<section>
			<SectionHeading>layout components</SectionHeading>

			<div className="space-y-8">
				{/* CellGrid */}
				<ExampleBlock label="CellGrid (3 cols)">
					<CellGrid cols={3}>
						<StatCell label="Uptime" value="99.9%" />
						<StatCell label="Requests" value="1.2M" />
						<StatCell label="Latency" value="42ms" />
					</CellGrid>
				</ExampleBlock>

				{/* CellRow */}
				<ExampleBlock label="CellRow">
					<CellRow>
						<div className="bg-[var(--receipt-bg)] p-4 md:w-1/3 md:shrink-0 text-xs">Left Panel</div>
						<div className="bg-[var(--receipt-bg)] p-4 flex-1 text-xs">Main Content</div>
					</CellRow>
				</ExampleBlock>

				{/* BentoSplit */}
				<ExampleBlock label="BentoSplit">
					<BentoSplit
						icon={<Glyph size={64} variant="filled">OC</Glyph>}
						content={
							<div className="text-xs space-y-1">
								<div className="font-bold uppercase">OpenClaw Deploy</div>
								<div className="text-[var(--muted-color)]">Open-source deployment platform</div>
							</div>
						}
						stats={
							<CellGrid cols={3}>
								<StatCell label="Deploys" value="142" />
								<StatCell label="Apps" value="8" />
								<StatCell label="Regions" value="3" />
							</CellGrid>
						}
					/>
				</ExampleBlock>

				{/* BentoLeader */}
				<ExampleBlock label="BentoLeader">
					<BentoLeader
						header={
							<div className="p-4 text-xs">
								<div className="font-bold uppercase">Feature Comparison</div>
							</div>
						}
						columns={[
							<StatCell label="Free" value="1 app" />,
							<StatCell label="Pro" value="10 apps" />,
							<StatCell label="Enterprise" value="Unlimited" />,
						]}
					/>
				</ExampleBlock>

				{/* BentoQuad */}
				<ExampleBlock label="BentoQuad">
					<BentoQuad
						topLeft={<div className="p-4 text-xs"><div className="font-bold uppercase">Dashboard</div><div className="text-[var(--muted-color)]">Overview metrics and charts</div></div>}
						topRight={<StatCell label="Status" value="Healthy" />}
						bottomLeft={
							<CellGrid cols={3}>
								<StatCell label="CPU" value="23%" />
								<StatCell label="Memory" value="512MB" />
								<StatCell label="Disk" value="4.2GB" />
							</CellGrid>
						}
						bottomRight={<StatCell label="Last Deploy" value="2h ago" />}
					/>
				</ExampleBlock>

				{/* BentoTriple */}
				<ExampleBlock label="BentoTriple">
					<BentoTriple
						header={<div className="p-4 text-xs font-bold uppercase">System Overview</div>}
						aside={<Glyph size={48} variant="circle">SYS</Glyph>}
						body={
							<div className="p-4 text-xs space-y-1">
								<div>Production environment running on 3 nodes.</div>
								<div className="text-[var(--muted-color)]">Last checked: 5 min ago</div>
							</div>
						}
						footer={
							<CellGrid cols={4}>
								<StatCell label="Nodes" value="3" />
								<StatCell label="Load" value="Low" />
								<StatCell label="Errors" value="0" />
								<StatCell label="Uptime" value="30d" />
							</CellGrid>
						}
					/>
				</ExampleBlock>

				{/* HeroPrimary */}
				<ExampleBlock label="HeroPrimary">
					<HeroPrimary
						side={<Glyph size={96} variant="circle-inverted">LW</Glyph>}
						header={<div className="font-bold uppercase text-xs">LEITWARE Platform</div>}
						body={<div className="text-xs text-[var(--muted-color)]">Self-hosted deployment infrastructure with zero vendor lock-in.</div>}
						footer={
							<CellGrid cols={3}>
								<StatCell label="Version" value="v2.4" />
								<StatCell label="License" value="AGPL" />
								<StatCell label="Stack" value="Convex" />
							</CellGrid>
						}
					/>
				</ExampleBlock>

				{/* HeroSecondary */}
				<ExampleBlock label="HeroSecondary">
					<HeroSecondary
						header={<div className="font-bold uppercase text-xs">Monitoring Dashboard</div>}
						statsRow={[
							<StatCell label="P50" value="12ms" />,
							<StatCell label="P95" value="89ms" />,
							<StatCell label="P99" value="240ms" />,
						]}
						content={<div className="text-xs text-[var(--muted-color)]">Latency percentiles over the last 24 hours across all endpoints.</div>}
						side={<Glyph size={64} variant="filled">MON</Glyph>}
					/>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function NavigationSection() {
	return (
		<section>
			<SectionHeading>navigation</SectionHeading>

			<div className="space-y-8">
				<ExampleBlock label="Breadcrumb">
					<Breadcrumb
						items={[
							{ label: 'Home', href: '/' },
							{ label: 'Account', href: '/account' },
							{ label: 'Settings' },
						]}
					/>
				</ExampleBlock>

				<ExampleBlock label="Theme Toggle">
					<div className="flex items-center gap-4 text-xs">
						<ThemeToggle />
						<span className="text-[var(--muted-color)]">Switches between light and dark themes</span>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ── Form Controls ─────────────────────────────────────────────────────── */

function CheckboxSection() {
	const [checked, setChecked] = useState(false)
	return (
		<section>
			<SectionHeading>checkbox</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="States">
					<div className="flex flex-col gap-4">
						<CheckboxField
							id="cb-checked"
							label="Enable AI workflow automation"
							description="Automatically route tasks to the best-fit model."
							checked={checked}
							onCheckedChange={(v) => setChecked(!!v)}
						/>
						<CheckboxField
							id="cb-unchecked"
							label="Send weekly performance digest"
							checked={false}
						/>
						<CheckboxField
							id="cb-disabled"
							label="Override rate limits (admin only)"
							description="Requires elevated permissions."
							checked={false}
							disabled
						/>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function SwitchSection() {
	const [on, setOn] = useState(true)
	return (
		<section>
			<SectionHeading>switch</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="States">
					<div className="flex flex-col gap-4">
						<SwitchField
							id="sw-on"
							label="Live data sync"
							description="Stream real-time updates from connected integrations."
							checked={on}
							onCheckedChange={(v) => setOn(!!v)}
						/>
						<SwitchField
							id="sw-off"
							label="Maintenance mode"
							checked={false}
						/>
						<SwitchField
							id="sw-disabled"
							label="GPU acceleration"
							description="Not available on this plan."
							checked={false}
							disabled
						/>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function RadioGroupSection() {
	const [plan, setPlan] = useState('pro')
	return (
		<section>
			<SectionHeading>radio group</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Plan selector">
					<RadioGroupField
						value={plan}
						onValueChange={setPlan}
						options={[
							{ value: 'starter', label: 'Starter', description: '5 automations · 1 seat' },
							{ value: 'pro', label: 'Pro', description: '50 automations · 5 seats' },
							{ value: 'enterprise', label: 'Enterprise', description: 'Unlimited · custom SLA' },
						]}
					/>
				</ExampleBlock>
			</div>
		</section>
	)
}

function SliderSection() {
	const [confidence, setConfidence] = useState([80])
	const [tokens, setTokens] = useState([2048])
	return (
		<section>
			<SectionHeading>slider</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Confidence threshold">
					<LabelledSlider
						label="Min. confidence score"
						value={confidence}
						onValueChange={(v) => setConfidence(Array.isArray(v) ? [...v] : [v as number])}
						min={0}
						max={100}
						step={1}
						showValue
					/>
				</ExampleBlock>
				<ExampleBlock label="Token budget">
					<LabelledSlider
						label="Max output tokens"
						value={tokens}
						onValueChange={(v) => setTokens(Array.isArray(v) ? [...v] : [v as number])}
						min={256}
						max={8192}
						step={256}
						showValue
					/>
				</ExampleBlock>
			</div>
		</section>
	)
}

function InputOTPSection() {
	const [otp, setOtp] = useState('')
	return (
		<section>
			<SectionHeading>input otp</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="6-digit verification code">
					<div className="flex flex-col gap-3">
						<Label htmlFor="otp-label" className="text-[10px]">Enter the code sent to your email</Label>
						<InputOTP length={6} value={otp} onChange={setOtp} />
						{otp.length === 6 && (
							<div className="text-[10px] text-[var(--muted-color)] uppercase tracking-wider">Code entered: {otp}</div>
						)}
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function LabelSection() {
	return (
		<section>
			<SectionHeading>label</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="With input">
					<div className="flex flex-col gap-2">
						<Label htmlFor="api-key">API key</Label>
						<input
							id="api-key"
							type="text"
							placeholder="lw_sk_..."
							className="h-8 w-full rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent px-3 text-xs font-medium uppercase tracking-wider placeholder:text-[var(--muted-color)] focus:outline-none"
						/>
					</div>
				</ExampleBlock>
				<ExampleBlock label="Required variant">
					<div className="flex flex-col gap-2">
						<Label htmlFor="webhook-url">
							Webhook URL <span className="text-destructive">*</span>
						</Label>
						<input
							id="webhook-url"
							type="url"
							placeholder="https://..."
							className="h-8 w-full rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-transparent px-3 text-xs font-medium uppercase tracking-wider placeholder:text-[var(--muted-color)] focus:outline-none"
						/>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Data Display ───────────────────────────────────────────────────────── */

function AlertSection() {
	return (
		<section>
			<SectionHeading>alert</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Variants">
					<div className="flex flex-col gap-3">
						<SimpleAlert
							title="Automation pipeline updated"
							description="Your invoice-processing workflow was redeployed with zero downtime."
						/>
						<SimpleAlert
							variant="destructive"
							title="API rate limit exceeded"
							description="Requests to OpenAI have been throttled. Upgrade your plan or reduce call frequency."
						/>
						{/* success — custom icon, default variant */}
						<SimpleAlert
							icon={<CheckCircle2Icon />}
							title="Integration connected"
							description="Xero is now syncing invoices in real time."
						/>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function AvatarSection() {
	return (
		<section>
			<SectionHeading>avatar</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Sizes & fallbacks">
					<div className="flex flex-wrap items-end gap-4">
						<div className="flex flex-col items-center gap-1">
							<UserAvatar name="Rowan Hensby" size="sm" />
							<span className="text-[10px] text-[var(--muted-color)] uppercase">sm</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<UserAvatar name="Rowan Hensby" size="default" />
							<span className="text-[10px] text-[var(--muted-color)] uppercase">default</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<UserAvatar name="Rowan Hensby" size="lg" />
							<span className="text-[10px] text-[var(--muted-color)] uppercase">lg</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<UserAvatar name="AI Agent" size="default" />
							<span className="text-[10px] text-[var(--muted-color)] uppercase">initials</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<UserAvatar size="default" />
							<span className="text-[10px] text-[var(--muted-color)] uppercase">no name</span>
						</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CardSection() {
	return (
		<section>
			<SectionHeading>card</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Full card">
					<SimpleCard
						title="Invoice Processing"
						description="AI-powered extraction & routing"
						footer={
							<div className="flex gap-2">
								<Button size="sm">Deploy</Button>
								<Button size="sm" variant="ghost">Edit</Button>
							</div>
						}
					>
						<div className="text-xs text-[var(--muted-color)] space-y-1">
							<div className="flex justify-between">
								<span>Processed today</span>
								<span className="text-foreground font-medium">142</span>
							</div>
							<div className="flex justify-between">
								<span>Accuracy</span>
								<span className="text-foreground font-medium">98.6%</span>
							</div>
							<div className="flex justify-between">
								<span>Avg. latency</span>
								<span className="text-foreground font-medium">1.2s</span>
							</div>
						</div>
					</SimpleCard>
				</ExampleBlock>
			</div>
		</section>
	)
}

function TableSection() {
	type Service = { name: string; status: string; calls: number; cost: string }
	const data: Service[] = [
		{ name: 'Invoice OCR', status: 'Active', calls: 1204, cost: '£2.41' },
		{ name: 'Email Triage', status: 'Active', calls: 847, cost: '£1.69' },
		{ name: 'Report Generator', status: 'Paused', calls: 0, cost: '£0.00' },
		{ name: 'Data Enrichment', status: 'Active', calls: 391, cost: '£0.78' },
	]
	return (
		<section>
			<SectionHeading>table</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Service usage">
					<TableDataTable<Service>
						caption="AI services · current billing period"
						keyField="name"
						columns={[
							{ key: 'name', header: 'Service' },
							{ key: 'status', header: 'Status', cell: (r) => <Badge variant={r.status === 'Active' ? 'default' : 'outline'}>{r.status}</Badge> },
							{ key: 'calls', header: 'API Calls', align: 'right' },
							{ key: 'cost', header: 'Cost', align: 'right' },
						]}
						data={data}
					/>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ProgressSection() {
	return (
		<section>
			<SectionHeading>progress</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Pipeline stages">
					<div className="flex flex-col gap-4">
						<LabelledProgress label="Data ingestion" value={100} showValue />
						<LabelledProgress label="Model inference" value={72} showValue />
						<LabelledProgress label="Post-processing" value={38} showValue />
						<LabelledProgress label="Delivery" value={0} showValue />
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function SkeletonSection() {
	return (
		<section>
			<SectionHeading>skeleton</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Card skeleton">
					<SkeletonCard lines={3} showAvatar />
				</ExampleBlock>
				<ExampleBlock label="Text & custom shapes">
					<div className="flex flex-col gap-3">
						<SkeletonText lines={2} />
						<div className="flex items-center gap-3">
							<Skeleton className="size-10 rounded-[var(--radius)]" />
							<div className="flex flex-col gap-2 flex-1">
								<Skeleton className="h-3 w-1/2" />
								<Skeleton className="h-3 w-3/4" />
							</div>
						</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CalendarSection() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	return (
		<section>
			<SectionHeading>calendar</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Date picker">
					<div className="flex flex-col gap-2">
						<Calendar
							selected={date}
							onSelect={(d) => setDate(d)}
						/>
						{date && (
							<div className="text-[10px] text-[var(--muted-color)] uppercase tracking-wider">
								Selected: {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
							</div>
						)}
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function AspectRatioSection() {
	return (
		<section>
			<SectionHeading>aspect ratio</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="16:9 — video thumbnail">
					<div className="w-64">
						<AspectRatio ratio={16 / 9} className="bg-[var(--receipt-bg)] border border-[var(--border-subtle)] flex items-center justify-center">
							<span className="text-[10px] uppercase text-[var(--muted-color)] tracking-wider">16 : 9</span>
						</AspectRatio>
					</div>
				</ExampleBlock>
				<ExampleBlock label="1:1 — avatar/logo">
					<div className="w-32">
						<AspectRatio ratio={1} className="bg-[var(--receipt-bg)] border border-[var(--border-subtle)] flex items-center justify-center">
							<span className="text-[10px] uppercase text-[var(--muted-color)] tracking-wider">1 : 1</span>
						</AspectRatio>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CodeBlockSection() {
	const sample = `// Leitware invoice automation
import { pipeline } from '@leitware/core'

const invoicePipeline = pipeline({
  extract: ocrExtractor({ model: 'gemini-2.0' }),
  validate: schemaValidator({ schema: invoiceSchema }),
  route: smartRouter({ destinations: ['xero', 'slack'] }),
})

await invoicePipeline.run({ file: 'invoice.pdf' })`
	return (
		<section>
			<SectionHeading>code block</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Pipeline definition">
					<CodeBlock className="text-xs">{sample}</CodeBlock>
				</ExampleBlock>
			</div>
		</section>
	)
}

function TreeViewSection() {
	return (
		<section>
			<SectionHeading>tree view</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Project structure">
					<div className="font-mono text-xs">
						<TreeView title="leitware-automation" isRoot defaultValue={true}>
							<TreeView title="src" defaultValue={true} isLastChild={false} parentLines={[false]}>
								<TreeView title="pipelines" isLastChild={false} parentLines={[false, true]}>
									<TreeView title="invoice.ts" isFile isLastChild={false} parentLines={[false, true, true]} />
									<TreeView title="email-triage.ts" isFile isLastChild={true} parentLines={[false, true, true]} />
								</TreeView>
								<TreeView title="index.ts" isFile isLastChild={true} parentLines={[false, true]} />
							</TreeView>
							<TreeView title="package.json" isFile isLastChild={true} parentLines={[false]} />
						</TreeView>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Overlays & Popovers ────────────────────────────────────────────────── */

function AlertDialogSection() {
	return (
		<section>
			<SectionHeading>alert dialog</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Confirmation dialog">
					<AlertDialog>
						<AlertDialogTrigger className="inline-flex h-8 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-foreground bg-destructive px-3 text-[10px] font-medium uppercase tracking-wider text-destructive-foreground hover:bg-destructive/90">
							Delete pipeline
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete invoice pipeline?</AlertDialogTitle>
								<AlertDialogDescription>
									This will permanently remove the automation and all associated logs. This action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Delete</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</ExampleBlock>
			</div>
		</section>
	)
}

function SheetSection() {
	return (
		<section>
			<SectionHeading>sheet</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Side panel (right)">
					<Sheet>
						<SheetTrigger className="inline-flex h-8 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground px-3 text-[10px] font-medium uppercase tracking-wider hover:bg-accent">
							Open settings panel
						</SheetTrigger>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle>Pipeline settings</SheetTitle>
								<SheetDescription>
									Configure runtime parameters for the invoice automation pipeline.
								</SheetDescription>
							</SheetHeader>
							<div className="mt-4 flex flex-col gap-3 text-xs text-[var(--muted-color)]">
								<div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
									<span>Model</span><span className="text-foreground font-medium">gemini-2.0-flash</span>
								</div>
								<div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
									<span>Max tokens</span><span className="text-foreground font-medium">4096</span>
								</div>
								<div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
									<span>Retry on fail</span><span className="text-foreground font-medium">3×</span>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</ExampleBlock>
			</div>
		</section>
	)
}

function DrawerSection() {
	return (
		<section>
			<SectionHeading>drawer</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Bottom drawer">
					<Drawer>
						<DrawerTrigger className="inline-flex h-8 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground px-3 text-[10px] font-medium uppercase tracking-wider hover:bg-accent">
							Open action drawer
						</DrawerTrigger>
						<DrawerContent side="bottom">
							<DrawerHeader>
								<DrawerTitle>Bulk actions</DrawerTitle>
								<DrawerDescription>Apply an action to the selected 14 invoices.</DrawerDescription>
							</DrawerHeader>
							<div className="flex flex-col gap-2 mt-4 px-4 pb-6">
								<Button variant="outline" size="sm" className="w-full">Export to Xero</Button>
								<Button variant="outline" size="sm" className="w-full">Mark as processed</Button>
								<Button variant="destructive" size="sm" className="w-full">Delete selected</Button>
							</div>
						</DrawerContent>
					</Drawer>
				</ExampleBlock>
			</div>
		</section>
	)
}

function PopoverSection() {
	return (
		<section>
			<SectionHeading>popover</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Click-triggered">
					<Popover>
						<PopoverTrigger className="inline-flex h-8 items-center rounded-[var(--radius)] border-[length:var(--border-width)] border-dashed border-foreground px-3 text-[10px] font-medium uppercase tracking-wider hover:bg-accent">
							Filter options
						</PopoverTrigger>
						<PopoverContent className="w-56">
							<div className="flex flex-col gap-2 text-xs">
								<div className="font-medium uppercase tracking-wider mb-1">Filter by status</div>
								{['Active', 'Paused', 'Draft', 'Archived'].map((s) => (
									<label key={s} className="flex items-center gap-2 cursor-pointer hover:text-foreground text-[var(--muted-color)]">
										<input type="checkbox" className="size-3" />
										{s}
									</label>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</ExampleBlock>
			</div>
		</section>
	)
}

function HoverCardSection() {
	return (
		<section>
			<SectionHeading>hover card</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Hover for details">
					<div className="text-xs">
						Hover over{' '}
						<HoverCard>
							<HoverCardTrigger className="underline underline-offset-2 cursor-pointer font-medium">
								Invoice #INV-2847
							</HoverCardTrigger>
							<HoverCardContent className="w-64">
								<div className="flex flex-col gap-1.5 text-xs">
									<div className="font-medium uppercase tracking-wider mb-1">INV-2847</div>
									<div className="flex justify-between text-[var(--muted-color)]">
										<span>Client</span><span className="text-foreground">Acme Corp</span>
									</div>
									<div className="flex justify-between text-[var(--muted-color)]">
										<span>Amount</span><span className="text-foreground">£4,200.00</span>
									</div>
									<div className="flex justify-between text-[var(--muted-color)]">
										<span>Due</span><span className="text-foreground">15 Apr 2026</span>
									</div>
									<div className="flex justify-between text-[var(--muted-color)]">
										<span>Status</span><span className="text-foreground">Awaiting approval</span>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>{' '}
						to see details.
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ContextMenuSection() {
	return (
		<section>
			<SectionHeading>context menu</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Right-click menu">
					<ContextMenu>
						<ContextMenuTrigger className="block border border-dashed border-[var(--border-subtle)] p-6 text-center text-xs text-[var(--muted-color)] cursor-context-menu select-none uppercase tracking-wider">
							Right-click here — Invoice #INV-2847
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>
								<CopyIcon className="size-3 mr-2" /> Duplicate
							</ContextMenuItem>
							<ContextMenuItem>
								<PencilIcon className="size-3 mr-2" /> Edit
							</ContextMenuItem>
							<ContextMenuItem>
								<MailIcon className="size-3 mr-2" /> Send to client
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem className="text-destructive">
								<TrashIcon className="size-3 mr-2" /> Delete
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CommandSection() {
	return (
		<section>
			<SectionHeading>command</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Search palette">
					<Command className="border border-[var(--border-subtle)] rounded-[var(--radius)]">
						<CommandInput placeholder="Search automations..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Pipelines">
								<CommandItem>Invoice OCR</CommandItem>
								<CommandItem>Email Triage</CommandItem>
								<CommandItem>Report Generator</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Actions">
								<CommandItem>New automation</CommandItem>
								<CommandItem>View logs</CommandItem>
								<CommandItem>Export data</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Toggle & Interactive ───────────────────────────────────────────────── */

function ToggleSection() {
	const [bold, setBold] = useState(false)
	const [italic, setItalic] = useState(false)
	const [underline, setUnderline] = useState(false)
	return (
		<section>
			<SectionHeading>toggle</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Text formatting">
					<div className="flex gap-1">
						<Toggle pressed={bold} onPressedChange={setBold} size="sm" aria-label="Bold">
							<BoldIcon />
						</Toggle>
						<Toggle pressed={italic} onPressedChange={setItalic} size="sm" aria-label="Italic">
							<ItalicIcon />
						</Toggle>
						<Toggle pressed={underline} onPressedChange={setUnderline} size="sm" aria-label="Underline">
							<UnderlineIcon />
						</Toggle>
					</div>
				</ExampleBlock>
				<ExampleBlock label="Variants">
					<div className="flex gap-2 flex-wrap">
						<Toggle variant="default" size="default">Default</Toggle>
						<Toggle variant="outline" size="default">Outline</Toggle>
						<Toggle variant="default" size="sm">Small</Toggle>
						<Toggle variant="outline" pressed disabled>Disabled</Toggle>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ToggleGroupSection() {
	const [align, setAlign] = useState<readonly string[]>(['left'])
	const [active, setActive] = useState<readonly string[]>([])
	return (
		<section>
			<SectionHeading>toggle group</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Single — text alignment">
					<ToggleGroup value={align} onValueChange={(v) => setAlign(v)}>
						<ToggleGroupItem value="left" aria-label="Left"><AlignLeftIcon className="size-3" /></ToggleGroupItem>
						<ToggleGroupItem value="center" aria-label="Center"><AlignCenterIcon className="size-3" /></ToggleGroupItem>
						<ToggleGroupItem value="right" aria-label="Right"><AlignRightIcon className="size-3" /></ToggleGroupItem>
					</ToggleGroup>
				</ExampleBlock>
				<ExampleBlock label="Multiple — feature flags">
					<ToggleGroup multiple value={active} onValueChange={(v) => setActive(v)}>
						<ToggleGroupItem value="ocr">OCR</ToggleGroupItem>
						<ToggleGroupItem value="nlp">NLP</ToggleGroupItem>
						<ToggleGroupItem value="routing">Routing</ToggleGroupItem>
						<ToggleGroupItem value="audit">Audit</ToggleGroupItem>
					</ToggleGroup>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CollapsibleSection2() {
	return (
		<section>
			<SectionHeading>collapsible</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Wrapper component">
					<div className="flex flex-col gap-2">
						<CollapsibleSection title="Advanced configuration" defaultOpen={false}>
							<div className="flex flex-col gap-2 text-xs text-[var(--muted-color)]">
								<div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
									<span>Retry strategy</span><span className="text-foreground">Exponential backoff</span>
								</div>
								<div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
									<span>Timeout</span><span className="text-foreground">30s</span>
								</div>
								<div className="flex justify-between py-1.5">
									<span>Cache TTL</span><span className="text-foreground">5 min</span>
								</div>
							</div>
						</CollapsibleSection>
					</div>
				</ExampleBlock>
				<ExampleBlock label="Primitive">
					<Collapsible className="border border-[var(--border-subtle)] px-3">
						<CollapsibleTrigger>Pipeline logs — last 24h</CollapsibleTrigger>
						<CollapsibleContent>
							<div className="pb-3 text-xs text-[var(--muted-color)] font-mono space-y-1">
								<div>[09:12:04] Invoice #INV-2851 · extracted · 1.1s</div>
								<div>[09:14:22] Invoice #INV-2852 · routed to xero · 0.4s</div>
								<div>[09:17:55] Email #EMX-0391 · triaged · spam · 0.2s</div>
							</div>
						</CollapsibleContent>
					</Collapsible>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Navigation ─────────────────────────────────────────────────────────── */

function PaginationSection() {
	const [page, setPage] = useState(3)
	return (
		<section>
			<SectionHeading>pagination</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Page navigation">
					<div className="flex flex-col gap-2 items-start">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
								</PaginationItem>
								{[1, 2, 3, 4, 5].map((p) => (
									<PaginationItem key={p}>
										<PaginationLink isActive={p === page} onClick={() => setPage(p)}>{p}</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink onClick={() => setPage(12)}>12</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationNext onClick={() => setPage((p) => Math.min(12, p + 1))} />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
						<div className="text-[10px] text-[var(--muted-color)] uppercase tracking-wider">Page {page} of 12</div>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function MenubarSection() {
	return (
		<section>
			<SectionHeading>menubar</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Horizontal menu">
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>Automations</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>New pipeline</MenubarItem>
								<MenubarItem>Import from JSON</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>All automations</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger>Integrations</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>Connect Xero</MenubarItem>
								<MenubarItem>Connect Slack</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>Manage keys</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger>Settings</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>Account</MenubarItem>
								<MenubarItem>Billing</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</ExampleBlock>
			</div>
		</section>
	)
}

function NavigationMenuSection() {
	return (
		<section>
			<SectionHeading>navigation menu</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Nav links">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink href="/" className={navigationMenuTriggerStyle}>Home</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href="/services" className={navigationMenuTriggerStyle}>Services</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle}>Pricing</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle}>Contact</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Layout ─────────────────────────────────────────────────────────────── */

function LayoutPrimitivesSection() {
	return (
		<section>
			<SectionHeading>layout primitives</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Stack (vertical)">
					<Stack gap={2}>
						{['Invoice OCR', 'Email Triage', 'Report Generator'].map((s) => (
							<div key={s} className="border border-[var(--border-subtle)] p-2 text-xs uppercase tracking-wider">{s}</div>
						))}
					</Stack>
				</ExampleBlock>
				<ExampleBlock label="Row (horizontal)">
					<LayoutRow gap={2} align="center">
						{['Deploy', 'Edit', 'Logs', 'Delete'].map((a) => (
							<div key={a} className="border border-[var(--border-subtle)] px-3 py-1 text-xs uppercase tracking-wider">{a}</div>
						))}
					</LayoutRow>
				</ExampleBlock>
				<ExampleBlock label="Grid (2 cols)">
					<Grid cols={2} gap={2}>
						{['Invoices', 'Emails', 'Reports', 'Logs'].map((item) => (
							<div key={item} className="border border-[var(--border-subtle)] p-3 text-xs uppercase tracking-wider text-center">{item}</div>
						))}
					</Grid>
				</ExampleBlock>
				<ExampleBlock label="BentoGrid">
					<BentoGrid cols={3}>
						<BentoCell span={2} className="text-xs uppercase tracking-wider">
							<div className="text-[10px] text-[var(--muted-color)] mb-1">Span 2</div>
							AI Pipeline Overview
						</BentoCell>
						<BentoCell span={1} className="text-xs uppercase tracking-wider">
							<div className="text-[10px] text-[var(--muted-color)] mb-1">Span 1</div>
							Status
						</BentoCell>
						<BentoCell span={1} className="text-xs uppercase tracking-wider">
							<div className="text-[10px] text-[var(--muted-color)] mb-1">Span 1</div>
							Logs
						</BentoCell>
						<BentoCell span={2} className="text-xs uppercase tracking-wider">
							<div className="text-[10px] text-[var(--muted-color)] mb-1">Span 2</div>
							Integration Health
						</BentoCell>
					</BentoGrid>
				</ExampleBlock>
			</div>
		</section>
	)
}

function SeparatorSection() {
	return (
		<section>
			<SectionHeading>separator</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Horizontal">
					<div className="flex flex-col gap-3 text-xs text-[var(--muted-color)]">
						<span>Invoice processing</span>
						<Separator orientation="horizontal" />
						<span>Email triage</span>
						<Separator orientation="horizontal" />
						<span>Report generation</span>
					</div>
				</ExampleBlock>
				<ExampleBlock label="Vertical">
					<div className="flex items-center gap-4 text-xs text-[var(--muted-color)]">
						<span>Invoices</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Emails</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Reports</span>
					</div>
				</ExampleBlock>
			</div>
		</section>
	)
}

function CarouselSection() {
	const services = [
		{ name: 'Invoice OCR', calls: 1204 },
		{ name: 'Email Triage', calls: 847 },
		{ name: 'Report Gen', calls: 391 },
		{ name: 'Data Enrichment', calls: 203 },
		{ name: 'Slack Notify', calls: 1890 },
	]
	return (
		<section>
			<SectionHeading>carousel</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Service cards">
					<CarouselRoot className="w-full">
						<CarouselContent>
							{services.map((s) => (
								<CarouselItem key={s.name} className="basis-1/3">
									<div className="border border-[var(--border-subtle)] p-4 text-xs">
										<div className="font-medium uppercase tracking-wider">{s.name}</div>
										<div className="text-[var(--muted-color)] mt-1">{s.calls.toLocaleString()} calls</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</CarouselRoot>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ScrollAreaSection() {
	const logs = Array.from({ length: 20 }, (_, i) => ({
		time: `09:${String(i + 1).padStart(2, '0')}:${String(i * 3 % 60).padStart(2, '0')}`,
		msg: `Invoice #INV-${2830 + i} processed in ${(Math.random() * 2 + 0.5).toFixed(1)}s`,
	}))
	return (
		<section>
			<SectionHeading>scroll area</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Pipeline logs">
					<ScrollArea className="h-40 border border-[var(--border-subtle)] p-3">
						<div className="flex flex-col gap-1 font-mono text-xs text-[var(--muted-color)]">
							{logs.map((l, i) => (
								<div key={i}>
									<span className="text-[var(--accent-color)] mr-2">[{l.time}]</span>
									{l.msg}
								</div>
							))}
						</div>
					</ScrollArea>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ResizableSection() {
	return (
		<section>
			<SectionHeading>resizable</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Horizontal panels">
					<ResizablePanelGroup direction="horizontal" className="h-32 border border-[var(--border-subtle)]">
						<ResizablePanel defaultSize={40} minSize={20}>
							<div className="flex h-full flex-col gap-1 p-3 text-xs">
								<div className="text-[10px] uppercase text-[var(--muted-color)] tracking-wider">Pipelines</div>
								<div className="text-xs">Invoice OCR</div>
								<div className="text-xs">Email Triage</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={60} minSize={20}>
							<div className="flex h-full flex-col gap-1 p-3 text-xs">
								<div className="text-[10px] uppercase text-[var(--muted-color)] tracking-wider">Detail</div>
								<div className="text-xs text-[var(--muted-color)]">Select a pipeline to view configuration.</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ExampleBlock>
			</div>
		</section>
	)
}

/* ── Feedback ───────────────────────────────────────────────────────────── */

function ToastSection() {
	return (
		<section>
			<SectionHeading>toast</SectionHeading>
			<div className="space-y-4">
				<ExampleBlock label="Toast trigger">
					<ToastProvider>
						<ToastTriggerDemo />
						<Toaster />
					</ToastProvider>
				</ExampleBlock>
			</div>
		</section>
	)
}

function ToastTriggerDemo() {
	const { toast } = useToast()
	return (
		<div className="flex gap-2 flex-wrap">
			<Button size="sm" variant="outline" onClick={() => toast({ title: 'Pipeline deployed', description: 'Invoice OCR is now live.', variant: 'default' })}>
				Default toast
			</Button>
			<Button size="sm" variant="outline" onClick={() => toast({ title: 'Integration error', description: 'Could not connect to Xero. Check credentials.', variant: 'destructive' })}>
				Destructive toast
			</Button>
			<Button size="sm" variant="outline" onClick={() => toast({ title: 'Automation saved', description: 'Email triage pipeline saved successfully.', variant: 'success' })}>
				Success toast
			</Button>
		</div>
	)
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export function DesignSystemPage() {
	return (
		<div className="max-w-[1152px] mx-auto px-6 pt-12 pb-24">
			{/* Header */}
			<header className="flex items-center justify-between mb-12 border-b pb-6">
				<div>
					<h1 className="text-2xl font-bold mb-1 uppercase">Design System</h1>
					<p className="text-[var(--muted-color)] text-xs">
						v2 · 48px grid · IBM Plex Mono · 2 themes
					</p>
				</div>
				<ThemeToggle />
			</header>

			<div className="space-y-16">
				<LogoBrandSection />
				<SpacingSection />
				<ColorTokensSection />
				<TypographySection />
				<ButtonsSection />
				<BadgeSection />
				<BlockLoaderSection />
				<FormInputsSection />
				<SelectSection />
				<ComboboxSection />
				<AccordionSection />
				<TabsSection />
				<DialogSection />
				<DropdownMenuSection />
				<TooltipSection />
				<ReceiptPrimitivesSection />
				<ListsSection />
				<LayoutsSection />
				<NavigationSection />

				{/* ── Form Controls ── */}
				<CheckboxSection />
				<SwitchSection />
				<RadioGroupSection />
				<SliderSection />
				<InputOTPSection />
				<LabelSection />

				{/* ── Data Display ── */}
				<AlertSection />
				<AvatarSection />
				<CardSection />
				<TableSection />
				<ProgressSection />
				<SkeletonSection />
				<CalendarSection />
				<AspectRatioSection />
				<CodeBlockSection />
				<TreeViewSection />

				{/* ── Overlays & Popovers ── */}
				<AlertDialogSection />
				<SheetSection />
				<DrawerSection />
				<PopoverSection />
				<HoverCardSection />
				<ContextMenuSection />
				<CommandSection />

				{/* ── Toggle & Interactive ── */}
				<ToggleSection />
				<ToggleGroupSection />
				<CollapsibleSection2 />

				{/* ── Navigation ── */}
				<PaginationSection />
				<MenubarSection />
				<NavigationMenuSection />

				{/* ── Layout ── */}
				<LayoutPrimitivesSection />
				<SeparatorSection />
				<CarouselSection />
				<ScrollAreaSection />
				<ResizableSection />

				{/* ── Feedback ── */}
				<ToastSection />

				{/* Footer */}
				<div className="border-t pt-4 flex items-center justify-between text-xs text-[var(--muted-color)]">
					<span>DOCKETS / Design System</span>
					<span>Spacing · Colors · Typography · Components · Layouts</span>
				</div>
			</div>
		</div>
	)
}
