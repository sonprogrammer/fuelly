// TODO이거 ai search페이지에서 쓰기

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {axiosInstance} from '@/lib/axios'


const postAiAnalyzeFood = async () => {
    const res = await axiosInstance.post('/ai-analyze-food')
    return res
}

const usePostAiAnalyzeFood = () => {
    // return 
}