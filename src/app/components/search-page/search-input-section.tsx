'use client'

import { ArrowUp } from "lucide-react"
import { useState } from "react"

interface SearchInputSectionProps {
    onSearch: (prompt: string) => Promise<boolean>
    isAnalyzing: boolean
}

export function SearchInputSection({ onSearch, isAnalyzing }: SearchInputSectionProps) {
    const [inputValue, setInputValue] = useState<string>('')

    const handleSearch = async () => {
        const success = await onSearch(inputValue)

        if (success) {
            setInputValue('')
        }
    }
    return (
        <section className="w-full">
            <div className="group relative">
                <div className="pointer-events-none absolute -inset-1 rounded-full bg-linear-to-r from-emerald-200 via-teal-100 to-emerald-100 opacity-40 blur-lg transition-opacity duration-300 group-focus-within:opacity-80" />
                <div className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
                            e.preventDefault()
                            if (!isAnalyzing && inputValue.trim() && inputValue.trim().length <= 100) {
                                handleSearch()
                            }
                        }}
                        aria-label="음식 분석 또는 식단 추천 요청"
                        placeholder="음식 이름이나 원하는 식단을 입력하세요."
                        className="min-w-0 flex-1 rounded-full bg-transparent py-3 pl-5 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:py-3.5 sm:text-base"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isAnalyzing || !inputValue.trim() || inputValue.trim().length > 100}
                        aria-label={isAnalyzing ? '분석 중' : 'AI 검색'}
                        aria-busy={isAnalyzing}
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-all duration-200 enabled:hover:bg-emerald-600 enabled:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none sm:size-12"
                    >
                        {isAnalyzing ? (
                            <div className="flex items-center gap-1" aria-hidden="true">
                                <span className="size-1.5 animate-bounce rounded-full bg-current motion-reduce:animate-none" />
                                <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:0.15s] motion-reduce:animate-none" />
                                <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:0.3s] motion-reduce:animate-none" />
                            </div>
                        ) : (
                            <ArrowUp className="size-5 sm:size-6" strokeWidth={2.5} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

        </section>

    )
}