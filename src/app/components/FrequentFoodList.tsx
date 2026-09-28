'use client'
import { FrequentFood } from '@/hooks/useGetFrequentFoods'
import { ChevronDown, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'



interface FrequentFoodListProps {
    frequentFoods: FrequentFood[]
    isPending: boolean
    onAddToToday: (food: FrequentFood) => void
}


export function FrequentFoodList({ frequentFoods, isPending, onAddToToday }: FrequentFoodListProps) {
    const [frequentOpen, setFrequentOpen] = useState(false)

    return (
        <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50">
            <button
                type="button"
                onClick={() => setFrequentOpen(!frequentOpen)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-800/60 hover:bg-gray-800 transition-colors"
            >
                <div className="flex items-center flex-1 justify-between gap-2">
                    <span className="text-sm font-medium text-gray-300">자주 먹는 음식에서 바로 추가하기</span>
                    <span className='mr-5 text-gray-500 text-xs'>최근 30일</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${frequentOpen ? 'rotate-180' : ''}`} />
            </button>

            {frequentOpen && (
                <div className="p-4 border-t border-gray-800">
                    {isPending ? (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                        </div>
                    ) : frequentFoods.length > 0 ? (
                        <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-2 scrollbar-hide">
                            {frequentFoods.map(food => (
                                <div
                                    key={food.foodId || food.name}
                                    className="group shrink-0 relative rounded-xl border border-gray-800 bg-gray-800/40 p-3.5 transition-all hover:border-gray-700 hover:bg-gray-800/70 min-w-[140px]"
                                >
                                    <button
                                        type="button"
                                        aria-label={`${food.name} 추가`}
                                        onClick={() => onAddToToday(food)}
                                        className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-90"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>

                                    <div className="pr-6">
                                        <p className="truncate text-sm font-semibold text-gray-100">
                                            {food.name}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {food.unit}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-center text-gray-600 py-4">
                            아직 등록된 자주 먹는 음식이 없어요
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}