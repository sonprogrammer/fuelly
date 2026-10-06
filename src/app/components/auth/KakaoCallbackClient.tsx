'use client'

import { TermBottomSheet } from "@/app/components/term-bottomsheet"
import { useAgreementStore } from "@/store/agreementsStore"
import { useUserStore } from "@/store/userStore"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export function KakaoCallbackClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { setUser, setUserAccessToken } = useUserStore(useShallow(state => ({
        setUser: state.setUser,
        setUserAccessToken: state.setUserAccessToken
    })))
    const {termOpen, setTermsOpen} = useAgreementStore(useShallow(state => 
        ({
            setTermsOpen:state.setTermOpen,
            termOpen: state.termOpen
        })
    ))

    useEffect(() => {
        const code = searchParams.get('code')

        if (!code) return

        const login = async () => {
            try {
                const res = await axios.post('/api/kakao-login', { code })
                if (!res.data.success) {
                    return
                }

                const newUser = ({
                    kakaoId: res.data.user.kakaoId,
                    name: res.data.user.name,
                    objectId: res.data.user.objectId,
                    height: res.data.user.height,
                    weight: res.data.user.weight,
                    goal: res.data.user.goal,
                    gender: res.data.user.gender,
                    activity: res.data.user.activity,
                    age: res.data.user.age,
                    birthDate: res.data.user.birthDate,
                    _id: res.data.user._id
                })

                setUserAccessToken(res.data.accessToken)
                setUser(newUser)

                if (res.data.needsAgreement) {
                    setTermsOpen(true)
                    return
                }

                if (newUser.height && newUser.weight) {
                    router.replace('/home')
                } else {
                    router.replace('/survey')
                }

                console.log('res.data', res.data)
            } catch (error) {
                console.error('카카오 로그인 실패', error)
            }
        }

        login()

    }, [router, searchParams, setTermsOpen, setUser, setUserAccessToken])

    return (
        <>
            <TermBottomSheet open={termOpen}/>
        </>
    )
    
}