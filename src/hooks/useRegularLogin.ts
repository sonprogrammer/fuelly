'use client'

import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";


interface LoginInfo {
    nickName: string;
    password: string;
}


const useRegularLogin = () => {
    const setUser = useUserStore(state => state.setUser)
    const router = useRouter()

    const login = async ({ nickName, password }: LoginInfo) => {
        try {
            const res = await axiosInstance.post('/regular-login', { nickName, password })
            if (res.data.success) {
                const newUser = {
                    nickName: res.data.user.nickName,
                    objectId: res.data.user._id,
                    //!이번엔 토큰 상태에 넣어서 관리해보기
                    accessToken : res.data.accessToken 
                }
                setUser(newUser)
                router.push('/home')
            }else if(!res.data.success){
                alert(`${res.data.message}`)
            }
            

        } catch (error) {
            console.error(error)
        }
    }
    return { login }
}

export default useRegularLogin