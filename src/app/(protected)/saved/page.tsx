"use client";

import { Card } from "@/app/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import useGetSavedFood from '@/hooks/useGetSavedFood'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import {Food} from '@/types/food'

interface SavedFood {
    _id: string;
    savedUser: string;
    foodId:{
        _id: string;
        name: string;
        unit: string;
        protein: number;
        calorie: number;
    }
}

export default function FoodTable() {
    const { data: savedFoods } = useGetSavedFood()
    // ! 이렇게 이름을 지정한 이유는 어차피 해당 유저로 해당 음식에 저장이 있으면 삭제되는 기능을 서버에서 구현해놈
    const { mutate: deleteSave } = useToggleSaveFood()
    const { mutate: addToDaily } = usePostFoodToDailyMeal()



    const deleteFood = (foodId: string) => {
        deleteSave(foodId,{
            onSuccess: () => {
                alert('삭제 성공')
            }
        })
    };

    const addFood = (food: Food) => {
        addToDaily(food,{
            onSuccess: () => {
                alert('오늘 식단에 추가 성공')
            }
        })
    };

    return (
        <div className="p-5">

            <h1 className="text-2xl font-bold text-center gap-2 py-5">
                나중에 혹은 취팅~~?ㅎㅎ
            </h1>

            {/* 모바일 카드 UI */}
            <div className="grid gap-3 md:hidden">
                <p className='text-gray-400 text-right'>+클릭시 오늘 식단에 추가됩니다</p>
                {savedFoods?.map((f:SavedFood) => (
                    <Card key={f.foodId._id} className="p-5">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-bold text-lg">{f.foodId.name}</h2>
                                <p className="text-sm text-gray-600">{f.foodId.unit}</p>
                                <p className="text-sm">단백질: {f.foodId.protein}g</p>
                                <p className="text-sm">칼로리: {f.foodId.calorie}kcal</p>
                            </div>
                            <section className="h-full flex items-center gap-2">
                                <button 
                                    className='cursor-pointer'
                                    onClick={() => addFood(f.foodId)}>
                                    <Plus className="text-green-500" />
                                </button>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => deleteFood(f.foodId._id)}>
                                    <Trash2 className="text-red-500" />
                                </button>
                            </section>

                        </div>
                    </Card>
                ))}
            </div>

            {/* 데스크탑 테이블 UI */}
            <table className="hidden md:table w-full text-center border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">음식</th>
                        <th className="p-2">양</th>
                        <th className="p-2">단백질(g)</th>
                        <th className="p-2">칼로리(kcal)</th>
                        <th className="p-2">오늘 식단에 추가</th>
                        <th className="p-2">삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {savedFoods?.map((f:SavedFood) => (
                        <tr key={f.foodId._id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{f.foodId.name}</td>
                            <td className="p-2">{f.foodId.unit}</td>
                            <td className="p-2">{f.foodId.protein}</td>
                            <td className="p-2">{f.foodId.calorie}</td>
                            <td className="p-2">
                                <button 
                                    className='cursor-pointer'
                                    onClick={() => addFood(f.foodId)}>
                                    <Plus className="text-green-500" />
                                </button>
                            </td>
                            <td className="p-2">
                                <button 
                                    className='cursor-pointer'
                                    onClick={() => deleteFood(f.foodId._id)}>
                                    <Trash2 className="text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
