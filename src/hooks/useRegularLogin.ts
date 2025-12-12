'use client'


import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import axios from 'axios'

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
            if (res.data.success) {
                const newUser = {
                    nickName: res.data.user.nickName,
                    height: res.data.user.height,
                    weight: res.data.user.weight,
                    goal : res.data.user.goal,
                    gender: res.data.user.gender,
                    activity: res.data.user.activity,
                    age: res.data.user.age,
                    _id: res.data.user._id
                    //!이번엔 토큰 상태에 넣어서 관리해보기
                }
                const accessToken = res.data.accessToken 
                setUserAccessToken(accessToken)
                setUser(newUser)
                // TODO여기서 기존에 저장된게 있으면 바로 홈으로 아니면 설문조사 하는 페이지로
                if(newUser?.weight && newUser?.height){
                    router.push('/home')
                }else {
                    router.push('/survey')
                }
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