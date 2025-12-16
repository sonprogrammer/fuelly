import {axiosInstance} from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'


const getDailyMeal = async () => {
    const res = await axiosInstance.get('/get-today-meal')
    console.log('res', res.data.userDailyMeal)
    return res.data.userDailyMeal
}

const useGetDailyMeal = () => {
    return useQuery({
        queryKey: ['todayMeal'],
        queryFn: () => getDailyMeal()
    })
}

export default useGetDailyMeal