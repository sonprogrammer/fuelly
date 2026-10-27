import { axiosInstance } from "@/lib/axios";
import { getAiSearchHistoryResSchema } from "@/schemas/ai/aiSearchHistory/aiSearchHistoryRes";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";


const getUserAiHistory = async(signal: AbortSignal) => {
    const res = await axiosInstance.get<unknown>('/ai-search-history',{ signal})
    const data = getAiSearchHistoryResSchema.parse(res.data)
    return data.histories
}


export function useGetUserAiHistory() {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['ai-search-history', user?._id],
        queryFn: ({signal}) => getUserAiHistory(signal),
        enabled: !!user?._id,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60
    })
}