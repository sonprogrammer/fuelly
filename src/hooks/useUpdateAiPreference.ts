import { AiPreference } from './../types/ai';
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';


interface UpdateAiPreferenceRes{
    message: string
}

const updateAiPreference = async(data: Partial<AiPreference>):Promise<UpdateAiPreferenceRes> => {
    const res = await axiosInstance.patch<UpdateAiPreferenceRes>('/ai-preference',data)
    return res.data
}

export function useUpdateAiPreference(userId?:string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateAiPreference,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['aiPreference', userId]})
            toast.success('업데이트 완료')
        }
    })
}

