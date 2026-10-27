import {axiosInstance} from '@/lib/axios'
import { getTodayMealResSchema } from '@/schemas/food/dailyMealRes'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

const getDailyMeal = async (signal: AbortSignal) => {
    const res = await axiosInstance.get<unknown>('/get-today-meal',{ signal})
        const data = getTodayMealResSchema.parse(res.data)
        return data.userDailyMeal
}

const useGetDailyMeal = () => {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['todayMeal', user?._id],
        queryFn: ({signal}) => getDailyMeal(signal),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30
    })
}

export default useGetDailyMeal