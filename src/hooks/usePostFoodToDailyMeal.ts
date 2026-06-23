import {axiosInstance} from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Food } from '@/types/food'
import toast from 'react-hot-toast'

const postFoodToDailyMeal = async (food: Food) => {
    const res = await axiosInstance.post('/addTo-today-meal', food)
    return res.data
    
}

const usePostFoodToDailyMeal = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (food:Food)=> postFoodToDailyMeal(food),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todayMeal']})
            toast.success('식단 등록 성공')
        },
        onError: () => {
            toast.error('식단 등록 실패')
        }
    })
}
export default usePostFoodToDailyMeal