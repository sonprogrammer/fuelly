import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteUserAiHistory = async (deletedId: string) => {
    const res = await axiosInstance.delete('/ai-search-history', { data: { deletedId } })
    return res.data
}

export function useDeleteUserAiHistory() {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: deleteUserAiHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ai-search-history', user?._id] })
        },
        onError: () => {
            toast.error('삭제 실패. 다시 시도해주세요')
        }
    })
}