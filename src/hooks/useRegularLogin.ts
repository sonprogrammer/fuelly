'use client'


import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { regularLoginResSchema } from "@/schemas/user/login/regularLoginRes";
interface LoginInfo {
    nickName: string;
    password: string;
}


const useRegularLogin = () => {
    const setUser = useUserStore(state => state.setUser)
    const setUserAccessToken = useUserStore(state => state.setUserAccessToken)
    const router = useRouter()


    const login = async ({ nickName, password }: LoginInfo) => {
        try {
            const res = await axios.post('api/regular-login', { nickName, password })
            const data = regularLoginResSchema.parse(res.data)

            const { user: newUser, accessToken } = data

            setUserAccessToken(accessToken)
            setUser(newUser)
            toast.success(`${newUser.nickName ?? nickName}님 환영합니다.`)

            if (newUser?.weight && newUser?.height) {
                router.push('/home')
            } else {
                router.push('/survey')
            }



        } catch (error) {
            console.error('로그인 실패', error)

            const message = axios.isAxiosError<{message?:unknown}>(error) ? error.response?.data.message : undefined

            toast.error(typeof message === 'string' ? message : '로그인 실패. 다시 시도해주세요')
        }
    }
    return { login }
}

export default useRegularLogin