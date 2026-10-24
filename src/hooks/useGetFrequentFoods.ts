import { axiosInstance } from "@/lib/axios"
import { frequentFoodsResSchema } from "@/schemas/food/frequentFoodsRes"
import { useUserStore } from "@/store/userStore"
import { useQuery } from "@tanstack/react-query"
import z from "zod"


export type FrequentFood = z.infer<typeof frequentFoodsResSchema>['frequentFoods'][number]


const getFrequentFoods = async() => {
    const res = await axiosInstance.get<unknown>('/frequent-foods')
    const data = frequentFoodsResSchema.parse(res.data)
    return data.frequentFoods
}

export function useGetFrequentFoods(){
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['frequent-foods', user?._id],
        queryFn: getFrequentFoods,
        staleTime: 1_000 * 60 * 30,
        gcTime: 1_000 * 60 * 60
    })
}