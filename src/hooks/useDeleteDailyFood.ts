import {axiosInstance} from '@/lib/axios'
import { useUserStore } from '@/store/userStore'
import {useMutation, useQueryClient} from '@tanstack/react-query'

const deleteDailyFood = async(mealId: string) => {
    const res = await axiosInstance.delete('/delete-food-from-today-meal',{data: {_id: mealId}})

    return res.data
}

const useDeleteDailyFood = () => {
    const queryClient = useQueryClient()
    const user = useUserStore(state=> state.user)

    return useMutation({
        mutationFn: deleteDailyFood,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todayMeal', user?._id]})
        }
    })
}


export default useDeleteDailyFood