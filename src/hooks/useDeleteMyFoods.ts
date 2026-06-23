import { axiosInstance } from '@/lib/axios';
import { Food } from '@/types/food';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const deleteFood = async (food: Food) => {
    const res = await axiosInstance.delete('/delete-food', {data: food})
    console.log('res', res)
    return res.data
}

export function useDeleteMyFoods(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteFood,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['nomalFoods']})
            toast.success(`${variables.name}이 삭제되엇습니다.`)
        },
        onError: () => {
            toast.error('삭제에 실패하였습니다')
        }
    })
}