import { ChevronLeft, ChevronRight } from "lucide-react"

import { ChartPaginationProps } from "./types"

export function ChartPagination({ page, totalPages, isFirst, isLast, onPrevious, onNext }: ChartPaginationProps) {
    return (
        <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">
            <button
                type="button"
                disabled={isFirst}
                onClick={onPrevious}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:text-gray-700 disabled:hover:bg-transparent"
            >
                <ChevronLeft className="h-4 w-4" />
                이전 7일
            </button>

            <span className="text-xs text-gray-600">
                {totalPages - page} / {totalPages}
            </span>

            <button
                type="button"
                disabled={isLast}
                onClick={onNext}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:text-gray-700 disabled:hover:bg-transparent"
            >
                다음 7일
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}