import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import {  AiSearchRes } from "@/types/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const postUserAiHistory = async ({ answer, prompt }: { answer: AiSearchRes, prompt: string }) => {
    const res = await axiosInstance.post<unknown>('/ai-search-history', { answer, prompt })
    return res.data
}

export function usePostUserAiHistory() {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: postUserAiHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ai-search-history', user?._id] })
        },
        onError: () => {
            toast.error('검색 내역 저장 실패.')
        }
    })
}