import {axiosInstance} from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Food } from '@/types/food'

const postFoodToDailyMeal = async (food: Food) => {
    const res = await axiosInstance.post('/addTo-today-meal', food)
    console.log('food', food)
    return res.data
    
}

const usePostFoodToDailyMeal = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (food:Food)=> postFoodToDailyMeal(food),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todayMeal']})
        }
    })
}
export default usePostFoodToDailyMeal