import { axiosInstance } from "@/lib/axios";

import { AiSearchHistory, AiSearchRes } from "@/types/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface PostAiSearchHistoryResponse {
  message: string
  history: AiSearchHistory
}


const postUserAiHistory = async ({ answer, prompt }: { answer: AiSearchRes, prompt: string }) => {
    const res = await axiosInstance.post<PostAiSearchHistoryResponse>('/ai-search-history', { answer, prompt })
    return res.data
}

export function usePostUserAiHistory(userId?: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postUserAiHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ai-search-history', userId] })
        },
        onError: () => {
            toast.error('검색 내역 저장 실패.')
        }
    })
}