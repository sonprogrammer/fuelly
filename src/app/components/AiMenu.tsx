'use client'


import { Sparkles } from 'lucide-react';
import AiRecommandMenu from './AiRecommandMenu'
import Image from 'next/image'
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
import { Food} from '@/types/food'

interface SavedFood {
    _id: string
    foodId: Food
    savedUser: string
}

export default function AiMenu() {
    const user = useUserStore(state => state.user)
    const {  remain} = useRemainNutrition(user)
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
        },{
            onSuccess: () => toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
        })
    }

    return (
        <div>

            <div className="bg-white p-5 rounded-md border border-gray-300 flex flex-col gap-3">
                <section>
                    <section className="flex gap-2 items-center">
                        <Image
                            src="/영양.png"
                            alt="icon"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                        <h1 className="font-bold">AI 맞춤 식단 추천</h1>
                    </section>
                    <p className='text-gray-500'>남은 영양 목표에 맞춰 최적의 식사를 추천해드립니다</p>
                </section>

                <section className="flex bg-linear-to-br from-blue-50 to-green-50 p-4 rounded-lg ">
                    <section className="flex-1 text-center">
                        <h2 className="text-gray-700 font-semibold">남은 칼로리</h2>
                        <h2 className="text-blue-600 font-bold">{(remain.calorie).toLocaleString()}kcal</h2>
                    </section>
                    <section className='flex-1 text-center'>
                        <h2 className="text-gray-700 font-semibold">남은 단백질</h2>
                        <h2 className="text-green-600 font-bold">{(remain.protein).toLocaleString()} g</h2>
                    </section>
                </section>
                {data && (
                    <section className="ai추천메뉴 mt-5 space-y-3">
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
                                    icon={<Heart fill={isSaved ? "#EC4899" : "none"}
                                        color={isSaved ? "#EC4899" : "currentColor"} />}

                                />
                            )
                        })}
                    </section>
                )}
                <button
                    onClick={handleClickAi}
                    disabled={recommending}
                    className={`
                        relative flex items-center justify-center w-full p-4 rounded-2xl font-bold text-white transition-all duration-300
                        ${recommending
                            ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                            : 'bg-linear-to-r from-emerald-500 via-teal-500 to-blue-500 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer'
                        }
                      `}
                >
                    {recommending ? (
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-5 w-5 animate-pulse text-emerald-400" />
                            <span className="animate-pulse">AI가 최적의 식단을 분석 중...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 animate-bounce-slow" />
                            <span className="tracking-tight">AI 맞춤 추천 받기</span>
                        </div>
                    )}

                    {!recommending && (
                        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 hover:opacity-10 transition-opacity pointer-events-none"></div>
                    )}
                </button>


            </div>
        </div>
    )
}