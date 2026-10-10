import { AiPreference } from './../types/ai';
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const updateAiPreference = async(data: AiPreference) => {
    const res = await axiosInstance.patch('/api/ai-preference',data)
    return res.data
}

export function useUpdateAiPreference() {
    return useMutation({
        mutationFn: updateAiPreference,
        onSuccess: () => {
            toast.success('업데이트 완료')
        }
    })
}