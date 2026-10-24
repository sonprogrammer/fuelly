import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import {  FoodInfo } from '@/types/food'
import { toast } from 'react-hot-toast'
import { useUserStore } from '@/store/userStore'

const postCustomFood = async (data: FoodInfo)=> {
    const res = await axiosInstance.post('/add-nomalFood', data)
    return res.data
}


const usePostAddCustomFood = () => {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)
    return useMutation({
        mutationFn: postCustomFood,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['nomalFoods', user?._id]})
        },
        onError: (err) => {
            console.error('err', err)
            toast.error('err occured')
        }
    })
}

export default usePostAddCustomFood