import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'
import { useUserStore } from '@/store/userStore'
import {  SavedFood } from '@/types/food'

export interface GetSaveFoodRes extends SavedFood{
    createdAt: string
}

const getSavedFood = async () =>{
    const res = await axiosInstance.get<GetSaveFoodRes[]>('/get-saved-food')
    return res.data
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