import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { AiRecommendFood, AiRecommendResult } from '@/types/ai'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface ErrorResponse {
    message: string
}

const recommendFood = async (data: AiRecommendFood): Promise<AiRecommendResult> => {
    const res = await axiosInstance.post('/ai-recommend-food', data)
    return res.data.answer
}

const usePostAiRecommendFood = () => {
    return useMutation({
        mutationFn: (data: AiRecommendFood) => recommendFood(data),
        onError: error => {
            if (error instanceof AxiosError) {
                const status = error.response?.status
                const message = (error.response?.data as ErrorResponse)?.message
                if (status === 429) {
                    toast.error(message || 'AI 요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.')
                    return
                }

                if (status === 401) {
                    toast.error('로그인이 필요합니다.')
                    return
                }

                if (status === 400) {
                    toast.error(message || '입력 정보를 확인해주세요.')
                    return
                }
            }

            toast.error('AI 추천에 실패했습니다. 다시 시도해주세요.')

        }
    })
}

export default usePostAiRecommendFood