import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'

const getSavedFood = async () =>{
    const res = await axiosInstance.get('/get-saved-food')
    return res.data
}

const useGetSavedFood = () => {
    return useQuery({
        queryKey: ['savedFoods'],
        queryFn: () => getSavedFood()
    })
}

export default useGetSavedFood