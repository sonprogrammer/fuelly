'use client'

import { KakaoLoginFallback } from "@/app/components/auth/KakaoLoginFallback"
import { TermBottomSheet } from "@/app/components/term-bottomsheet"

import { kakaoLoginResSchema } from "@/schemas/user/login/kakaologinRes"
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

                const data = kakaoLoginResSchema.parse(res.data)

                const { user: newUser, accessToken, needsAgreement} = data


                setUserAccessToken(accessToken)
                setUser(newUser)

                if (needsAgreement) {
                    setTermsOpen(true)
                    return
                }

                if (newUser.height && newUser.weight) {
                    router.replace('/home')
                } else {
                    router.replace('/survey')
                }

            } catch (error) {
                console.error('카카오 로그인 실패', error)
            }
        }

        login()

    }, [router, searchParams, setTermsOpen, setUser, setUserAccessToken])

    return (
        <>
        {!termOpen && <KakaoLoginFallback />}
            <TermBottomSheet open={termOpen}/>
        </>
    )
    
}