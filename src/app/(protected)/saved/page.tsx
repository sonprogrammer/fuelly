"use client";

import { Trash2, Calendar, HeartOff } from "lucide-react"
import useGetSavedFood from '@/hooks/useGetSavedFood'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import { Food } from '@/types/food'
import { toast } from 'react-hot-toast'

interface SavedFood {
    _id: string;
    savedUser: string;
    foodId: Food
}

export default function FoodTable() {
    const { data: savedFoods, isPending } = useGetSavedFood()
    // ! 이렇게 이름을 지정한 이유는 어차피 해당 유저로 해당 음식에 저장이 있으면 삭제되는 기능을 서버에서 구현해놈
    const { mutate: deleteSave } = useToggleSaveFood()
    const { mutate: addToDaily } = usePostFoodToDailyMeal()



    const deleteFood = (foodId: string) => {
        deleteSave(foodId, {
            onSuccess: () => {
                toast.success('음식이 삭제되었습니다!')
            }
        })
    }

    const addFood = (food: Food) => {
        addToDaily(food, {
            onSuccess: () => {
                toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
            }
        })
    }

    if (isPending) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-2 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        )
    }

    if (!savedFoods || savedFoods.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
                <div className="p-4 bg-gray-800 rounded-full mb-4">
                    <HeartOff className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-sm font-semibold text-gray-400 mb-1">즐겨찾기한 음식이 없어요</p>
                <p className="text-xs text-gray-600">자주 먹는 음식을 즐겨찾기에 추가하고 간편하게 식단을 구성해 보세요</p>
            </div>
        )
    }
    return (
        <div className="p-5 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">즐겨찾기한 음식</h2>
                <p className="text-xs text-gray-600">달력 아이콘으로 오늘 식단에 추가</p>
            </div>

            <div className="flex flex-col gap-2 md:hidden">
                {savedFoods?.map((f: SavedFood) => (
                    <div key={f.foodId._id} className="flex items-center justify-between px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-sm font-semibold text-white truncate">{f.foodId.name}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span>{f.foodId.unit}</span>
                                <span className="w-px h-3 bg-gray-700" />
                                <span>{f.foodId.calorie} kcal</span>
                                <span className="w-px h-3 bg-gray-700" />
                                <span>단백질 {f.foodId.protein}g</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 ml-3 shrink-0">
                            <button
                                onClick={() => addFood(f.foodId)}
                                aria-label='식단추가'
                                className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer"
                            >
                                <Calendar className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                                onClick={() => deleteFood(f.foodId._id!)}
                                aria-label='저장삭제'
                                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-800 border-b border-gray-700">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">음식</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">제공량</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">칼로리</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">단백질</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-16">식단추가</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-16">삭제</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {savedFoods?.map((f: SavedFood) => (
                            <tr key={f.foodId._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-white">{f.foodId.name}</td>
                                <td className="px-4 py-3 text-gray-600 text-xs">{f.foodId.unit}</td>
                                <td className="px-4 py-3 text-center text-orange-400 font-medium">{f.foodId.calorie} kcal</td>
                                <td className="px-4 py-3 text-center text-emerald-400 font-medium">{f.foodId.protein}g</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => addFood(f.foodId)}
                                        aria-label='식단추가'
                                        className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer inline-flex"
                                    >
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => deleteFood(f.foodId._id!)}
                                        aria-label='저장삭제'
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer inline-flex"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
