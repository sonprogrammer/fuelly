import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '../lib/axios'


const getUserAllMeal = async() => {
    const res = await axiosInstance.get('/get-all-meal')
    return res.data.userAllMeal
}

const useGetUserAllMeal = () => {
    return useQuery({
        queryKey: ['allMeals'],
        queryFn: getUserAllMeal
    })
}

export default useGetUserAllMeal