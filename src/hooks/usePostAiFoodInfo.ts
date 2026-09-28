
import { axiosInstance } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface FoodAiInfo {
    calorie: number;
    protein: number;
    unit?: string
}


interface ErrorResponse {
    message: string
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
            if (error instanceof AxiosError) {
                const status = error.response?.status
                const message = (error.response?.data as ErrorResponse)?.message

                if (status === 429) {
                    toast.error(message || 'AI 요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.')
                    return
                }

                if (status === 400) {
                    toast.error(message || '올바른 음식명을 입력해주세요.')
                    return
                }

                if (status === 401) {
                    toast.error('로그인이 필요합니다.')
                    return
                }
            }

            toast.error('AI 분석에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setIsFetching(false)
        }
    }

    return { getFoodInfo, isFetching }
}