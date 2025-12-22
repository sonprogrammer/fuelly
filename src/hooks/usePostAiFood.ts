import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance} from '@/lib/axios'
import {CreateFoodFromAi} from '@/types/ai'

const postAiFood = async(food: CreateFoodFromAi) => {
    const res = await axiosInstance.post('/save-ai-food',{food})
    return res.data
}


const usePostAiFood = () =>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (food:CreateFoodFromAi)=> postAiFood(food),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['savedFoods']})
        }
    })
}

export default usePostAiFood