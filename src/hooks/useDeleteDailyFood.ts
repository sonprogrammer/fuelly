import {axiosInstance} from '@/lib/axios'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Food} from '@/types/food'

const deleteDailyFood = async(food: Food) => {
    const res = await axiosInstance.delete('/delete-food-from-today-meal',{data: food})

    return res.data
}

const useDeleteDailyFood = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (food: Food) => deleteDailyFood(food),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todayMeal']})
        }
    })
}


export default useDeleteDailyFood