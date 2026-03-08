import * as React from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
} from '@/components/ui/table'

export interface Column<T> {
	key: keyof T | string
	header: string
	cell?: (row: T) => React.ReactNode
	align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
	columns: Column<T>[]
	data: T[]
	caption?: string
	keyField?: keyof T
}

function DataTable<T extends Record<string, unknown>>({
	columns,
	data,
	caption,
	keyField,
}: DataTableProps<T>) {
	return (
		<Table>
			{caption && <TableCaption>{caption}</TableCaption>}
			<TableHeader>
				<TableRow>
					{columns.map((col) => (
						<TableHead
							key={String(col.key)}
							style={{ textAlign: col.align ?? 'left' }}
						>
							{col.header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, i) => (
					<TableRow key={keyField ? String(row[keyField as string]) : i}>
						{columns.map((col) => (
							<TableCell key={String(col.key)} style={{ textAlign: col.align ?? 'left' }}>
								{col.cell ? col.cell(row) : String(row[col.key as string] ?? '')}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export {
	DataTable,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
}
