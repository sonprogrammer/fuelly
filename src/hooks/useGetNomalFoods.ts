import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { getNormalFoodsSchema } from '@/schemas/food/getNormalFood'
import { useUserStore } from '@/store/userStore'

const getNomalFoods = async (signal: AbortSignal) => {
    const res = await axiosInstance.get<unknown>('/nomal-foods' ,{signal})
    const data = getNormalFoodsSchema.parse(res.data)
    return data.foods
}


const useGetNomalFoods = () => { 
    const user = useUserStore(state => state.user)
    return useQuery({
        queryKey: ['nomalFoods', user?._id],
        queryFn: ({signal}) => getNomalFoods(signal),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        enabled: !!user?._id
    })
}

export default useGetNomalFoods