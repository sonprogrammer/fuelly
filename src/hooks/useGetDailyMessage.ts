import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getDailyMsg = async() => {
    const res = await axiosInstance.get('/daily-msg')
    console.log('res.data', res.data)
    return res.data
}

export function useGetDailyMessage(){
    return useQuery({
        queryKey: ['dailyMessage'],
        queryFn: getDailyMsg,
        staleTime: 1000 * 60 * 60 * 24,
        retry: false
    })
}