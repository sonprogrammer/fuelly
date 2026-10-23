import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance} from '@/lib/axios'
import {CreateFoodFromAi} from '@/types/ai'
import { useUserStore } from '@/store/userStore';

const postAiFood = async(food: CreateFoodFromAi) => {
    const res = await axiosInstance.post('/save-ai-food',{food})
    return res.data
}


const usePostAiFood = () =>{
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: postAiFood,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['savedFoods', user?._id]})
        }
    })
}

export default usePostAiFood