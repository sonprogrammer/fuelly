'use client'

import { DesktopVersion } from "@/app/components/save-page/desktop-table";
import { MobilVersion } from "@/app/components/save-page/mobile-table";
import useGetSavedFood from "@/hooks/useGetSavedFood";
import usePostFoodToDailyMeal from "@/hooks/usePostFoodToDailyMeal";
import useToggleSaveFood from "@/hooks/useToggleSaveFood";
import { Food } from "@/types/food";
import { HeartOff } from "lucide-react";
import toast from "react-hot-toast";

export function SavedTable(){
    const { data: savedFoods, isPending } = useGetSavedFood()

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
    
    
    return(
        <>
            <MobilVersion savedFoods={savedFoods} addFood={addFood} deleteFood={deleteFood}/>
            <DesktopVersion savedFoods={savedFoods} addFood={addFood} deleteFood={deleteFood}/>

        </>
    )
}