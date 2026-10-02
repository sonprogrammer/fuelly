'use client'

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
        <section className="w-full flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                <div className="relative flex items-center bg-white rounded-2xl border border-gray-100 shadow-sm focus-within:border-blue-300 transition-all">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full p-4 sm:p-5 rounded-2xl outline-none text-sm sm:text-base"
                        placeholder="예: BBQ 황금올리브 치킨 한 마리, 나에게 맞는 식단 추천 해줘"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                disabled={isAnalyzing || !inputValue.trim() || inputValue.trim().length > 100}
                className="h-14 sm:h-auto bg-emerald-500 text-white px-8 rounded-2xl font-bold flex items-center justify-center hover:bg-emerald-800 transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300  disabled:text-gray-400 disabled:cursor-not-allowed!"
            >
                {isAnalyzing ? (
                    <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                ) : (
                    <>
                        <span className="whitespace-nowrap ">분석하기</span>
                    </>
                )}
            </button>
        </section>

    )
}