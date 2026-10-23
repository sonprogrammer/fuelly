import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'


// interface GetNormalFoodsRes{
//     foods: {

//     }
// }

const getNomalFoods = async () => {
    const res = await axiosInstance.get('/nomal-foods')
    console.log('res', res.data)
    return res.data.foods
}


const useGetNomalFoods = () => { 
    return useQuery({
        queryKey: ['nomalFoods'],
        queryFn: () => getNomalFoods(),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24
    })
}

export default useGetNomalFoods