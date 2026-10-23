import {axiosInstance} from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useUserStore } from '@/store/userStore'
import { AddDailyMealReq } from '@/types/dailyMeal'

const postFoodToDailyMeal = async (food: AddDailyMealReq) => {
    const res = await axiosInstance.post('/addTo-today-meal', food)
    return res.data
    
}

const usePostFoodToDailyMeal = () => {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)
    return useMutation({
        mutationFn: postFoodToDailyMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todayMeal', user?._id]})
        },
        onError: () => {
            toast.error('식단 등록 실패')
        }
    })
}
export default usePostFoodToDailyMeal