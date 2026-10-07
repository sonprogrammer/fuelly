import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ErrorResponse {
    message: string
}

const aiSearch = async (prompt: string) => {
    const res = await axiosInstance.post('/ai-search', prompt)
    return res.data.answer
}


const usePostAiSearch = () => {

    return useMutation({
        mutationFn: (prompt: string) => aiSearch(prompt),
        onSuccess: (data) => { console.log('success', data) },
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
                    toast.error(message || '입력 내용을 확인해주세요.')
                    return
                }
            }

            toast.error('AI 분석에 실패했습니다. 다시 시도해주세요.')
        }
    })
}

export default usePostAiSearch