import { axiosInstance } from "@/lib/axios";
import { getAiPreferenceResSchema } from "@/schemas/user/aiPreference/aiPreference";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";



const getAiPreference = async(signal: AbortSignal) => {
    const res = await axiosInstance.get<unknown>('/ai-preference', {signal})
    return getAiPreferenceResSchema.parse(res.data)
}

export function useGetAiPreference() {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['aiPreference', user?._id],
        queryFn:({signal}) =>  getAiPreference(signal),
        enabled: !!user?._id,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}