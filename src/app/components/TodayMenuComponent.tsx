'use client'

import MenuItem from './MenuItem'
import useGetDailyMeal from '@/hooks/useGetDailyMeal'
import useDeleteDailyFood from '@/hooks/useDeleteDailyFood'
import { Food } from '@/types/food'
import { useUserStore } from '@/store/userStore'
import useRemainNutrition from '@/hooks/useRemainNutrition'
import { ChevronDown, Loader2, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'

export default function TodayMenuComponent() {
    const [isOpen, setIsOpen] = useState(false)
    const user = useUserStore(state => state.user)
    const { data: dailyFoods, isPending } = useGetDailyMeal()
    const { consumed, remain } = useRemainNutrition(user)

    const { mutate } = useDeleteDailyFood()
    const foods = dailyFoods?.meals

    const handleDeleteBtnClick = (food: Food) => {
        mutate(food)
    }

    return (
         <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-base font-semibold text-white">오늘 먹은 음식</h2>
            <p className="text-xs text-gray-600 mt-0.5">
                {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
            </p>
        </div>

        <div className="p-5">
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-red-500/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-red-400 mb-1">섭취 칼로리</p>
                    <p className="text-lg font-bold text-red-400 leading-tight">{consumed.dailyCalorie.toLocaleString()}</p>
                    <p className="text-xs text-red-500/50">kcal</p>
                </div>
                <div className={`rounded-xl p-3 text-center ${remain.calorie < 0 ? 'bg-red-500/10' : 'bg-blue-500/10'}`}>
                    <p className={`text-xs mb-1 ${remain.calorie < 0 ? 'text-red-400' : 'text-blue-400'}`}>남은 칼로리</p>
                    <p className={`text-lg font-bold leading-tight ${remain.calorie < 0 ? 'text-red-400' : 'text-blue-400'}`}>{remain.calorie.toLocaleString()}</p>
                    <p className={`text-xs opacity-50 ${remain.calorie < 0 ? 'text-red-400' : 'text-blue-400'}`}>kcal</p>
                </div>
                <div className={`rounded-xl p-3 text-center ${remain.protein < 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                    <p className={`text-xs mb-1 ${remain.protein < 0 ? 'text-red-400' : 'text-emerald-400'}`}>남은 단백질</p>
                    <p className={`text-lg font-bold leading-tight ${remain.protein < 0 ? 'text-red-400' : 'text-emerald-400'}`}>{remain.protein.toLocaleString()}</p>
                    <p className={`text-xs opacity-50 ${remain.protein < 0 ? 'text-red-400' : 'text-emerald-400'}`}>g</p>
                </div>
            </div>

            {isPending ? (
                <div className='w-full flex justify-center py-10'>
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
            ) : !foods || foods.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <UtensilsCrossed className="w-10 h-10 text-gray-700 mb-3" />
                    <p className="text-sm text-gray-500">아직 기록된 음식이 없어요</p>
                    <p className="text-xs text-gray-700 mt-1">오른쪽에서 음식을 추가해보세요</p>
                </div>
            ) : (
                <div className="border border-gray-800 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-300">목록 보기</span>
                            <span className="text-xs bg-gray-700 text-gray-400 rounded-full px-2 py-0.5">{foods.length}개</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="flex flex-col divide-y divide-gray-800 max-h-80 overflow-y-auto">
                            {foods.map((food: Food) => (
                                <MenuItem food={food} type='delete' key={food._id} onDelete={handleDeleteBtnClick} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
 
    )
}