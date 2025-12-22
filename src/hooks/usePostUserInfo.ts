'use client'

import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from "@/lib/axios"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'


interface UserInfo{
        weight: number | null,
        height: number | null,
        goal: 'bulk' | 'diet' | 'maintain' | null
}


const postUserInfo = async (data: UserInfo) => {
    const res = await axiosInstance.post('/submit-userInfo',data)
    return res.data
}


const usePostUserInfo = () => {
    const setUser = useUserStore(state=> state.setUser)
    const router = useRouter()
    return useMutation({
        mutationFn: (data:UserInfo) => postUserInfo(data),
        onSuccess: (data) => {
            if (typeof data === 'object' && data !== null) {
              
              setUser(data.user)
              router.replace('/home')
            } else {
              console.error('서버 응답이 올바른 객체가 아닙니다:', data)
              toast.error('서버 응답 오류')
            }
          },
        onError: (err) => {
            console.log('사용자 정보 전송 시패', err)
            toast.error('에러가 발생하였습니다. 잠시후 다시 이용해주세요')
        }
    })
}

export default usePostUserInfo