import { AiRecommendResultFood } from '@/types/ai'
import AiRecommendProgressBar from './AiRecommendProgressBar'
import { PlusCircle, Utensils, BookmarkPlus } from 'lucide-react'

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
        <div className="group relative flex flex-col gap-5 border border-emerald-100 rounded-4xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            

            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">{data.name}</h3>
                        <button 
                            aria-label='즐겨찾기'
                            onClick={() => handleSaveToggle(data)}
                            className="transition-transform active:scale-125 cursor-pointer text-pink-500"
                        >
                            {icon}
                        </button>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">
                        {data.amount} 기준
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <div className="flex justify-between text-sm font-black">
                        <span className="text-gray-500">칼로리</span>
                        <span className="text-orange-500">{data.calorie} <span className="text-xs font-medium">kcal</span></span>
                    </div>
                    <AiRecommendProgressBar percent={caloriePercent} />
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-sm font-black">
                        <span className="text-gray-500">단백질</span>
                        <span className="text-emerald-600">{data.protein} <span className="text-xs font-medium">g</span></span>
                    </div>
                    <AiRecommendProgressBar percent={proteinPercent} />
                </div>
            </div>

            <div className="flex gap-2 pt-2">
                <button 
                    onClick={() => handleAddDaily(data)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 active:scale-[0.97] transition-all cursor-pointer shadow-sm shadow-emerald-100"
                >
                    <PlusCircle className="w-4 h-4" />
                    오늘 식단
                </button>
                <button 
                    onClick={() => handleAddCustom(data)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 text-gray-600 border border-gray-100 rounded-xl font-bold text-sm hover:bg-gray-100 active:scale-[0.97] transition-all cursor-pointer"
                >
                    <BookmarkPlus className="w-4 h-4" />
                    내 음식함
                </button>
            </div>
        </div>
    )
}