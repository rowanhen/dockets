import * as React from 'react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'

export interface SimpleCardProps {
	title?: string
	description?: string
	footer?: React.ReactNode
	children?: React.ReactNode
	className?: string
}

function SimpleCard({ title, description, footer, children, className }: SimpleCardProps) {
	return (
		<Card className={className}>
			{(title || description) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
			)}
			{children && <CardContent>{children}</CardContent>}
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	)
}

export { SimpleCard as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export { Card as CardRoot } from '@/components/ui/card'
