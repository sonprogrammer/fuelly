import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'


const toggleSaveFood = async(foodId: string) => {
    
    const res = await axiosInstance.post('/toggle-save-food', {foodId})
    return res.data
}


const useToggleSaveFood = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: toggleSaveFood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedFoods'] })
        },
        onError: (error) => {
            console.error('토글 실패:', error)
            alert('요청 처리에 실패했습니다.')
        }
    })
}

export default useToggleSaveFood