'use client'

import { Trash2, X } from 'lucide-react'
import { useAiSearchHistoryStore } from '@/store/aiSearchHistoryStore'
import { useShallow } from 'zustand/react/shallow'

interface AiSearchHistoryPanelProps {
    onSelect: (id: string) => void
    open: boolean
    onClose: () => void
}

export function AiSearchHistoryPanel({ onSelect, open, onClose }: AiSearchHistoryPanelProps) {

    const { histories, removeHistory, clearHistory } = useAiSearchHistoryStore(useShallow(state => ({
        histories: state.histories,
        removeHistory: state.removeHistory,
        clearHistory: state.clearHistory
    })))

    return (
        <>

            {open && (
                <div className="fixed inset-0 z-50">
                    <button
                        type="button"
                        aria-label="닫기"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/30"
                    />

                    <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-5 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">최근 AI 검색</h2>
                                <p className="mt-1 text-xs text-gray-500">최근 10개의 검색 기록입니다</p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {histories.length === 0 ? (
                            <div className="flex h-40 items-center justify-center text-sm text-gray-400">
                                아직 검색 기록이 없습니다
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {histories.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSelect(item.id)
                                                onClose()
                                            }}
                                            className="min-w-0 flex-1 text-left"
                                        >
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {item.prompt}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {new Date(item.createdAt).toLocaleString('ko-KR')}
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => removeHistory(item.id)}
                                            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {histories.length > 0 && (
                            <button
                                type="button"
                                onClick={clearHistory}
                                className="mt-5 w-full rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                            >
                                전체 기록 삭제
                            </button>
                        )}
                    </aside>
                </div>
            )}
        </>
    )
}