'use client'

import axios from "axios"
import { useRouter } from "next/navigation"


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
                alert('회원가입 성공 로그인하셍')
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            alert('회원가입 실패')
        }
    }
    return { register }
}

export default usePostRegister

