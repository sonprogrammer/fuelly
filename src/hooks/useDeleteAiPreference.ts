import { axiosInstance } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface DeleteAiPreferenceResponse {
    message: string
}

const deleteAiPreference = async (): Promise<DeleteAiPreferenceResponse> => {
    const res = await axiosInstance.delete<DeleteAiPreferenceResponse>('/ai-preference')
    return res.data
}

export function useDeleteAiPreference(userId?: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteAiPreference,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['aiPreference', userId] })
            toast.success('AI 맞춤 설정을 초기화했습니다.')
        }
    })
}