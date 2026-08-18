
import { axiosInstance } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'


const requestDailyMsg = async(userPrompt: string) => {
    console.log('usePormpont', userPrompt)
    const res = await axiosInstance.post('/groq', {prompt: userPrompt})
    console.log('res', res.data)
    return res.data
}


export function useRequestDailyMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: requestDailyMsg,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dailyMessage']})
        }
    })


}