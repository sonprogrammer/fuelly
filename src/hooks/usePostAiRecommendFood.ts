import { useMutation } from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'
import { AiRecommendFood, AiRecommendResult} from '@/types/ai'



const recommendFood = async(data:AiRecommendFood): Promise<AiRecommendResult> => {
    const res = await axiosInstance.post('/ai-recommend-food', data)
    console.log('hooks from recommend', res.data)
    return res.data.parsedAnswer
}

const usePostAiRecommendFood = () => {
    return useMutation({
        mutationFn: (data:AiRecommendFood) => recommendFood(data)
    })
}

export default usePostAiRecommendFood