import {axiosInstance} from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'


const getDailyMeal = async () => {
    const res = await axiosInstance.get('/get-today-meal')
    return res.data.userDailyMeal
}

const useGetDailyMeal = () => {
    return useQuery({
        queryKey: ['todayMeal'],
        queryFn: () => getDailyMeal(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30
    })
}

export default useGetDailyMeal