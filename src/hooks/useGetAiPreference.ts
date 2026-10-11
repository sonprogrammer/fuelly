import { axiosInstance } from "@/lib/axios";
import { AiPreference } from "@/types/ai";
import { useQuery } from "@tanstack/react-query";

interface GetAiPreferenceRes{
    message: string;
    aiPreference:AiPreference
}


const getAiPreference = async():Promise<GetAiPreferenceRes> => {
    const res = await axiosInstance.get<GetAiPreferenceRes>('/ai-preference')
    console.log('res', res.data)
    return res.data
}

export function useGetAiPreference(userId?: string) {
    return useQuery({
        queryKey: ['aiPreference', userId],
        queryFn: () => getAiPreference(),
        enabled: !!userId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}