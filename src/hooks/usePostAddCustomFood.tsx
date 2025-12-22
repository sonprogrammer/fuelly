import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { Food } from '@/types/food'
import { toast } from 'react-hot-toast'

const postCustomFood = async (data: Food)=> {
    const res = await axiosInstance.post('/add-nomalFood', data)
    return res.data
}


const usePostAddCustomFood = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:Food) => postCustomFood(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['nomalFoods']})
        },
        onError: (err) => {
            console.log('err', err)
            toast.error('err occured')
        }
    })
}

export default usePostAddCustomFood