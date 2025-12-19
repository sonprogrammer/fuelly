import { useMutation } from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'
import { AiRecommendFood, AiRecommendResult} from '@/types/ai'



const recommendFood = async(data:AiRecommendFood): Promise<AiRecommendResult> => {
    const res = await axiosInstance.post('/ai-recommend-food', data)
    return res.data.answer
}

const usePostAiRecommendFood = () => {
    return useMutation({
        mutationFn: (data:AiRecommendFood) => recommendFood(data)
    })
}

export default usePostAiRecommendFood