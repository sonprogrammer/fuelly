import { AiRecommendResultFood } from '@/types/ai'
import AiRecommendProgressBar from './AiRecommendProgressBar'
import { PlusCircle, BookmarkPlus } from 'lucide-react'

interface AiRecommendMenuProps {
    data: AiRecommendResultFood
    caloriePercent: number
    proteinPercent: number
    handleAddCustom: (food: AiRecommendResultFood) => void
    handleAddDaily: (food: AiRecommendResultFood) => void
    handleSaveToggle: (food: AiRecommendResultFood) => void
    icon: React.ReactNode
}

export default function AiRecommendMenu({ 
    data, 
    proteinPercent, 
    icon, 
    handleSaveToggle, 
    caloriePercent, 
    handleAddCustom, 
    handleAddDaily 
}: AiRecommendMenuProps) {

    return (
        <div className="flex flex-col gap-4 px-4 py-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{data.name}</h3>
                    <button
                        aria-label='즐겨찾기'
                        onClick={() => handleSaveToggle(data)}
                        className="p-1 rounded-md hover:bg-pink-500/10 transition-colors cursor-pointer"
                    >
                        {icon}
                    </button>
                </div>
                <span className="text-xs text-gray-600">{data.amount} 기준</span>
            </div>
            <div className="flex items-center gap-3 text-right">
                <div>
                    <p className="text-xs text-gray-600">칼로리</p>
                    <p className="text-sm font-semibold text-orange-400">{data.calorie} kcal</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">단백질</p>
                    <p className="text-sm font-semibold text-emerald-400">{data.protein}g</p>
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                    <span>칼로리 충족률</span>
                    <span>{Math.round(caloriePercent)}%</span>
                </div>
                <AiRecommendProgressBar percent={caloriePercent} />
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                    <span>단백질 충족률</span>
                    <span>{Math.round(proteinPercent)}%</span>
                </div>
                <AiRecommendProgressBar percent={proteinPercent} />
            </div>
        </div>

        <div className="flex gap-2">
            <button
                onClick={() => handleAddDaily(data)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer"
            >
                <PlusCircle className="w-3.5 h-3.5" />
                오늘 식단에 추가
            </button>
            <button
                onClick={() => handleAddCustom(data)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-700 text-gray-400 text-xs font-medium rounded-lg hover:bg-gray-700 active:scale-[0.98] transition-all cursor-pointer"
            >
                <BookmarkPlus className="w-3.5 h-3.5" />
                내 음식함에 저장
            </button>
        </div>
    </div>
  
    )
}