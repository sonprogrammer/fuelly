import {axiosInstance} from '@/lib/axios'
import { useUserStore } from '@/store/userStore'
import { DailyMealItem } from '@/types/dailyMeal'
import { useQuery } from '@tanstack/react-query'

interface GetDailyMealsRes{
    userDailyMeal: {
        meals: DailyMealItem[]
    }
}

const getDailyMeal = async () => {
    const res = await axiosInstance.get<GetDailyMealsRes>('/get-today-meal')
    return res.data.userDailyMeal
}

const useGetDailyMeal = () => {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['todayMeal', user?._id],
        queryFn: () => getDailyMeal(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30
    })
}

export default useGetDailyMeal