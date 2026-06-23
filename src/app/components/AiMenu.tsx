'use client'


import { Sparkles } from 'lucide-react';
import AiRecommandMenu from './AiRecommandMenu'
import useRemainNutrition from '@/hooks/useRemainNutrition'
import { useUserStore } from '@/store/userStore'
import usePostAiRecommendFood from '@/hooks/usePostAiRecommendFood'
import { AiRecommendResultFood } from '@/types/ai'
import usePostAddCustomFood from '@/hooks/usePostAddCustomFood'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import useGetSavedFood from '@/hooks/useGetSavedFood'
import usePostAiFood from '@/hooks/usePostAiFood'
import { Heart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Food } from '@/types/food'

interface SavedFood {
    _id: string
    foodId: Food
    savedUser: string
}

export default function AiMenu() {
    const user = useUserStore(state => state.user)
    const { remain } = useRemainNutrition(user)
    const { data, mutate: recommendFood, isPending: recommending } = usePostAiRecommendFood()
    const { mutate: postCustomFood } = usePostAddCustomFood()
    const { mutate: dailyMutate } = usePostFoodToDailyMeal()
    const { mutate: toggleSave } = useToggleSaveFood()
    const { data: savedFoods } = useGetSavedFood()
    const { mutate: saveAiFood } = usePostAiFood()

    const savedFoodMap = new Map<string, string>(
        savedFoods?.map((item: SavedFood) => [
            item.foodId.name,
            item.foodId._id
        ])
    )



    const handleClickAi = () => {
        if (!user) return

        recommendFood(
            {
                user: {
                    gender: user.gender!,
                    age: user.age!,
                    height: user.height!,
                    weight: user.weight!,
                    goal: user.goal!,
                    activity: user.activity!
                },
                remain: {
                    calorie: remain.calorie,
                    protein: remain.protein
                }
            }
        )
    }
    const handleSaveToggle = (food: AiRecommendResultFood) => {
        const savedFoodId = savedFoodMap.get(food?.name)
        if (!savedFoodId) {
            saveAiFood({
                name: food.name,
                calorie: food.calorie,
                protein: food.protein,
                unit: food.amount
            }, {
                onSuccess: () => toast.success('즐겨찾기에 저장되었습니다!')
            })
            return
        }
        toggleSave(savedFoodId, {
            onSuccess: () => {
                toast.success('즐겨찾기에서 삭제되었습니다!')
            }
        })
    }

    const handleAddCustom = (food: AiRecommendResultFood) => {
        postCustomFood({
            name: food.name,
            calorie: food.calorie,
            protein: food.protein,
            unit: food.amount
        }, {
            onSuccess: () => toast.success(`${food.name}이(가) 새로운 음식이 등록되었습니다!`)
        })
    }

    const handleAddDaily = (food: AiRecommendResultFood) => {
        dailyMutate({
            name: food.name,
            calorie: food.calorie,
            protein: food.protein,
            unit: food.amount
        }, {
            onSuccess: () => toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
        })
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-white">AI 맞춤 식단 추천</h2>
                    <p className="text-xs text-gray-600">남은 영양 목표에 맞춰 최적의 식사를 추천해드립니다</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-500/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-400 mb-1">남은 칼로리</p>
                    <p className="text-lg font-bold text-blue-400 leading-tight">{remain.calorie.toLocaleString()}</p>
                    <p className="text-xs text-blue-500/50">kcal</p>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-emerald-400 mb-1">남은 단백질</p>
                    <p className="text-lg font-bold text-emerald-400 leading-tight">{remain.protein.toLocaleString()}</p>
                    <p className="text-xs text-emerald-500/50">g</p>
                </div>
            </div>

            {data && (
                <div className="border border-gray-800 rounded-xl overflow-hidden mb-4">
                    {data.meals.map((food) => {
                        const savedFoodId = savedFoodMap.get(food.name)
                        const isSaved = Boolean(savedFoodId)
                        const caloriePercent = Math.min((food.calorie / remain.calorie) * 100, 100)
                        const proteinPercent = Math.min((food.protein / remain.protein) * 100, 100)
                        return (
                            <AiRecommandMenu
                                key={food.name}
                                data={food}
                                caloriePercent={caloriePercent}
                                proteinPercent={proteinPercent}
                                handleAddCustom={handleAddCustom}
                                handleAddDaily={handleAddDaily}
                                handleSaveToggle={handleSaveToggle}
                                icon={
                                    <Heart
                                        className="w-4 h-4"
                                        fill={isSaved ? "#EC4899" : "none"}
                                        color={isSaved ? "#EC4899" : "#4B5563"}
                                    />
                                }
                            />
                        )
                    })}
                </div>
            )}

            <button
                onClick={handleClickAi}
                disabled={recommending}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${recommending
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.98] cursor-pointer'
                    }`}
            >
                <Sparkles className={`w-4 h-4 ${recommending ? 'animate-pulse' : ''}`} />
                <span>{recommending ? 'AI가 분석 중...' : 'AI 맞춤 추천 받기'}</span>
            </button>
        </>

    )
}