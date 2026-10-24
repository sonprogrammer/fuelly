import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { toast } from 'react-hot-toast'
import { useUserStore } from '@/store/userStore'


const toggleSaveFood = async(foodId: string) => {
    const res = await axiosInstance.post('/toggle-save-food', {foodId})
    return res.data
}


const useToggleSaveFood = () => {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)
    return useMutation({
        mutationFn: toggleSaveFood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedFoods', user?._id] })
        },
        onError: (error) => {
            console.error('토글 실패:', error)
            toast.error('요청 처리에 실패했습니다.')
        }
    })
}

export default useToggleSaveFood