import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '../lib/axios'
import { useUserStore } from '@/store/userStore'
import { getAllMealsResSchema } from '@/schemas/food/dailyMealRes'


const getUserAllMeal = async(period: number) => {
    const res = await axiosInstance.get<unknown>(`/get-all-meal?days=${period}`)
    const data = getAllMealsResSchema.parse(res.data)
    return data.userAllMeal
}

const useGetUserAllMeal = (period: number) => {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['allMeals',period, user?._id],
        queryFn: () => getUserAllMeal(period),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        enabled: !!user?._id
    })
}

export default useGetUserAllMeal