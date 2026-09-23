
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";


interface FoodAiInfo {
    calorie: number;
    protein: number;
    unit?: string
}


const getAiFoodInfo = async (foodName: string) => {
    const res = await axiosInstance.post<FoodAiInfo>('/ai-food-info', { foodName })
    return res.data
}


export function useAiFoodInfo() {
    const queryClient = useQueryClient()
    const [isFetching, setIsFetching] = useState(false)

    const getFoodInfo = async (foodName: string) => {
        const normalizedFoodName = foodName.trim().toLowerCase()

        const queryKey = ['ai-food-info', normalizedFoodName]

        const cached = queryClient.getQueryData<FoodAiInfo>(queryKey)

        if (cached) {
            return cached
        }

        try {
            setIsFetching(true)

            const data = await getAiFoodInfo(normalizedFoodName)
            queryClient.setQueryData(queryKey, data)
            return data
        } catch(error){
            toast.error('올바른 음식명을 입력해주세요')
        } finally {
            setIsFetching(false)
        }
    }

    return { getFoodInfo, isFetching }
}