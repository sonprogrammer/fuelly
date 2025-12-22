'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'


interface RegisterData {
    nickName: string
    password: string
}

const usePostRegister = () => {
    const router = useRouter()

    const register = async (data: RegisterData) => {
        try {
            const res = await axios.post('/api/register', { data })
            if (res.data.success) {
                toast.success('성공적으로 가입되었습니다!')
                router.replace('/')
            }
        } catch (error) {
            console.log(error)
            toast.error('회원가입 실패')
        }
    }
    return { register }
}

export default usePostRegister

