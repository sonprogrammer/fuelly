import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const getAiFoodInfo = async(foodName: string) => {
    const res = await axiosInstance.post('/ai-food-info', {foodName})
    return res.data
}

export function usePostAiFoodInfo() {
    return useMutation({
        mutationFn: getAiFoodInfo,
        onError: () => {
            toast.error('AI 분석에 실패했습니다. 다시 시도해주세요.')
        }
    })
}