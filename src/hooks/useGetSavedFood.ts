import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'
import { useUserStore } from '@/store/userStore'
import { savedFoodsResSchema } from '@/schemas/food/savedFoodsRes'

const getSavedFood = async () =>{
    const res = await axiosInstance.get<unknown>('/get-saved-food')
    const data = savedFoodsResSchema.parse(res.data)
    return data
}

const 
useGetSavedFood = () => {
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['savedFoods', user?._id],
        queryFn: getSavedFood,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
    })
}

export default useGetSavedFood