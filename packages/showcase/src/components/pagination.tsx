import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from '@/components/ui/pagination'

export interface SimplePaginationProps {
	page: number
	totalPages: number
	onPageChange?: (page: number) => void
	className?: string
}

function SimplePagination({ page, totalPages, onPageChange, className }: SimplePaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
	const showEllipsisStart = page > 4
	const showEllipsisEnd = page < totalPages - 3

	const visiblePages = showEllipsisStart || showEllipsisEnd
		? [
				1,
				...(showEllipsisStart ? [] : [2, 3]),
				...(showEllipsisStart ? ['ellipsis-start'] : []),
				...(page > 2 && page < totalPages - 1 ? [page - 1, page, page + 1] : []),
				...(showEllipsisEnd ? ['ellipsis-end'] : []),
				...(showEllipsisEnd ? [] : [totalPages - 2, totalPages - 1]),
				totalPages,
		  ].filter((v, i, arr) => arr.indexOf(v) === i)
		: pages

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => { e.preventDefault(); page > 1 && onPageChange?.(page - 1) }}
						aria-disabled={page <= 1}
						disabled={page <= 1}
					/>
				</PaginationItem>
				{visiblePages.map((p) =>
					typeof p === 'string' ? (
						<PaginationItem key={p}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={p}>
							<PaginationLink
								href="#"
								isActive={p === page}
								onClick={(e) => { e.preventDefault(); onPageChange?.(p) }}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					),
				)}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={(e) => { e.preventDefault(); page < totalPages && onPageChange?.(page + 1) }}
						aria-disabled={page >= totalPages}
						disabled={page >= totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export {
	SimplePagination as Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
}
export { Pagination as PaginationRoot } from '@/components/ui/pagination'
