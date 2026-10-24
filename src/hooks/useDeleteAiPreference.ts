import { axiosInstance } from '@/lib/axios'
import { deleteAllAiPreferenceResSchema } from '@/schemas/user/aiPreference/aiPreference'
import { useUserStore } from '@/store/userStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'


// * ai세팅 초기화 
const deleteAiPreference = async () => {
    const res = await axiosInstance.delete<unknown>('/ai-preference')
    return deleteAllAiPreferenceResSchema.parse(res.data)
}

export function useDeleteAiPreference() {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: deleteAiPreference,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['aiPreference', user?._id] })
            toast.success('AI 맞춤 설정을 초기화했습니다.')
        }
    })
}