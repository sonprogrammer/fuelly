'use client'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'
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
            console.log('res', res)
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
                // TODO 서버로 부터 토큰이랑 리프레시토큰은Httponly쿠키로 받아서 처리로직 작성해야함
                if(newUser.height && newUser.weight){
                    router.push('/home')
                }else{
                    router.push('/survey')

                }
            }
        } catch (error) {
            // TODO 로그인 오류시 알림창 라이브러리 도입
            console.error('error login', error)
        }
    }

    const kakaoOnFailure = () => {
        // TODO 로그인 오류시 알림창 라이브러리 도입
        console.log('kakao login error')
    }

    return { kakaoOnSuccess, kakaoOnFailure}
}

export default useKakaoLogin