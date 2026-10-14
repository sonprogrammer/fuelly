import { axiosInstance } from "@/lib/axios";

import { AiSearchHistory } from "@/types/ai";
import { useQuery } from "@tanstack/react-query";



interface GetAiSearchHistoryResponse {
  message: string
  histories: AiSearchHistory[]
}


const getUserAiHistory = async():Promise<AiSearchHistory[]> => {
    const res = await axiosInstance.get<GetAiSearchHistoryResponse>('/ai-search-history')
    return res.data.histories
}

export function useGetUserAiHistory(userId?: string) {
    return useQuery({
        queryKey: ['ai-search-history', userId],
        queryFn: getUserAiHistory,
        enabled: !!userId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60
    })
}