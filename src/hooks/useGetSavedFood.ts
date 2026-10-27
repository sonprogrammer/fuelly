import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'
import { useUserStore } from '@/store/userStore'
import { savedFoodsResSchema } from '@/schemas/food/savedFoodsRes'

const getSavedFood = async (signal: AbortSignal) =>{
    const res = await axiosInstance.get<unknown>('/get-saved-food',{signal})
    const data = savedFoodsResSchema.parse(res.data)
    return data
}

const 
useGetSavedFood = () => {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['savedFoods', user?._id],
        queryFn: ({signal}) => getSavedFood(signal),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
    })
}

export default useGetSavedFood