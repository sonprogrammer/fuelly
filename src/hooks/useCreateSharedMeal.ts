import { GroupFoodsArrayType } from '@/types/food';
import { axiosInstance } from "@/lib/axios";
import { useMutation } from '@tanstack/react-query';

interface CreateSharedMealData{
    meals: GroupFoodsArrayType[];
    totalCalorie: number;
    totalProtein: number;
}

interface CreateShareMealRes{
    shareId: string
}

const createShareMeal = async(data:CreateSharedMealData):Promise<CreateShareMealRes>=>{
    const res = await axiosInstance.post('/share-meal', data)
    return res.data
}

export function useCreateSharedMeal() {
    return useMutation({
        mutationFn: createShareMeal
    })
}