import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '../lib/axios'


const getUserAllMeal = async(period: number) => {
    const res = await axiosInstance.get(`/get-all-meal?days=${period}`)
    return res.data.userAllMeal
}

const useGetUserAllMeal = (period: number) => {
    return useQuery({
        queryKey: ['allMeals',period],
        queryFn: () => getUserAllMeal(period)
    })
}

export default useGetUserAllMeal