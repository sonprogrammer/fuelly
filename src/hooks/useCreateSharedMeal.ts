
import { axiosInstance } from "@/lib/axios";
import { mealShareResSchema } from "@/schemas/food/mealShareRes";
import { GroupMealsArrayType } from "@/types/dailyMeal";
import { useMutation } from '@tanstack/react-query';

interface CreateSharedMealData{
    meals: GroupMealsArrayType[];
    totalCalorie: number;
    totalProtein: number;
}


const createShareMeal = async(data:CreateSharedMealData) =>{
    const res = await axiosInstance.post<unknown>('/share-meal', data)
    return mealShareResSchema.parse(res.data)
}

export function useCreateSharedMeal() {
    return useMutation({
        mutationFn: createShareMeal
    })
}