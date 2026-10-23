import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export interface FrequentFood {
    foodId?: string //food id임, 일단은 자주먹는음식인데 음식문서에 저장이 안되어있을 수도 있을 경우를 위해서 옵셔널
    name: string
    calorie: number
    protein: number
    unit: string
    count: number
    _id: string //식단의 각음식 배열에 있는 오브젝트 아이디
}

interface FrequentFoodsResponse {
    message: string
    frequentFoods: FrequentFood[]
}

const getFrequentFoods = async():Promise<FrequentFood[]> => {
    const res = await axiosInstance.get<FrequentFoodsResponse>('/frequent-foods')
    console.log('res', res.data)
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