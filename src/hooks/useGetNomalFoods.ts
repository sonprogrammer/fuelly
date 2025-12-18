import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'

const getNomalFoods = async () => {
    const res = await axiosInstance.get('/nomal-foods')
    return res.data.foods
}


const useGetNomalFoods = () => {
    return useQuery({
        queryKey: ['nomalFoods'],
        queryFn: () => getNomalFoods()
    })
}

export default useGetNomalFoods