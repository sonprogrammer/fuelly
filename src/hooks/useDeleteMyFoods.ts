import { axiosInstance } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';
import { Food } from '@/types/food';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const deleteFood = async (food: Food) => {
    const res = await axiosInstance.delete('/delete-food', {data: food})
    return res.data
}

export function useDeleteMyFoods(){
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: deleteFood,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['nomalFoods', user?._id]})
            toast.success(`${variables.name} 삭제`)
        },
        onError: () => {
            toast.error('삭제에 실패하였습니다')
        }
    })
}