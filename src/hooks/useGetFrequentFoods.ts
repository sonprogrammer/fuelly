import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export interface FrequentFood {
    foodId: string
    name: string
    calorie: number
    protein: number
    unit: string
    count: number
}

interface FrequentFoodsResponse {
    message: string
    frequentFoods: FrequentFood[]
}

const getFrequentFoods = async():Promise<FrequentFood[]> => {
    const res = await axiosInstance.get<FrequentFoodsResponse>('/frequent-foods')
    return res.data.frequentFoods
}

export function useGetFrequentFoods(){
    return useQuery({
        queryKey: ['frequent-foods'],
        queryFn: getFrequentFoods,
        staleTime: 1_000 * 60 * 30,
        gcTime: 1_000 * 60 * 60
    })
}