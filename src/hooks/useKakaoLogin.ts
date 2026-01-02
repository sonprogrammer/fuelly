'use client'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
interface KakaoToken {
    response: {
        access_token: string
    }
}

const useKakaoLogin = () => {
    const setUser = useUserStore(state => state.setUser)
    const setUserAccessToken = useUserStore(state => state.setUserAccessToken)

    const router = useRouter()
    const kakaoOnSuccess = async (data: KakaoToken) => {
        const kakaoAccessToken = data.response.access_token
        try {
            const res = await axios.post('api/kakao-login',{
               kakaoAccessToken
            })
            if(res.data.success){
                const newUser = ({
                    kakaoId: res.data.user.kakaoId,
                    name: res.data.user.name,
                    objectId: res.data.user.objectId,
                    height: res.data.user.height,
                    weight: res.data.user.weight,
                    goal : res.data.user.goal,
                    gender: res.data.user.gender,
                    activity: res.data.user.activity,
                    age: res.data.user.age,
                    _id: res.data.user._id
                })
                const accessToken = res.data.accessToken
                setUserAccessToken(accessToken)
                setUser(newUser)

                if(newUser.height && newUser.weight){
                    router.push('/home')
                }else{
                    router.push('/survey')

                }
            }
        } catch (error) {

            console.error('error login', error)
        }
    }

    const kakaoOnFailure = () => {
        console.log('kakao login error')
        toast.error('카카오 로그인 에러가 발생하였습니다')
    }

    return { kakaoOnSuccess, kakaoOnFailure}
}

export default useKakaoLogin