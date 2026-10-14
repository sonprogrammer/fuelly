'use client'

import { AiSearchHistory } from "@/types/ai"

interface AiSearchChipsProps {
    histories: AiSearchHistory[]
    onSelect: (id: string) => void
    onOpenAll: () => void
}


export function AiSearchHistoryChips({ histories, onSelect, onOpenAll }: AiSearchChipsProps) {
    if (histories.length === 0) return null

    const visibleHistories = histories.slice(0, 3)
    const hiddenCount = histories.length - visibleHistories.length

    return (
        <div className="w-full max-w-4xl ml-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                    type="button"
                    onClick={onOpenAll}
                    className="shrink-0 text-xs font-medium text-gray-500 hover:text-emerald-600"
                >
                    최근 검색
                </button>

                {visibleHistories.map(history => (
                    <button
                        key={history._id}
                        type="button"
                        onClick={() => onSelect(history._id)}
                        className="max-w-44 shrink-0 truncate rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-500"
                    >
                        {history.prompt}
                    </button>
                ))}

                {hiddenCount > 0 && (
                    <button
                        type="button"
                        onClick={onOpenAll}
                        className="shrink-0 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                        +{hiddenCount}
                    </button>
                )}
            </div>
        </div>
    )
}