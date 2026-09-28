'use client'

import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import { useShallow } from 'zustand/react/shallow'
import axios from 'axios'
import { axiosInstance } from '@/lib/axios'


export default function ProtectUser({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const initialized = useRef(false)
    const { setUser, setUserAccessToken, clearUser } = useUserStore(useShallow(state => ({
        setUser: state.setUser,
        setUserAccessToken: state.setUserAccessToken,
        clearUser: state.clearUser
    })))


    useEffect(() => {
        if(initialized.current) return
        initialized.current = true
        const initToken = async () => {

            try {
                const { userAccessToken , user} = useUserStore.getState()
                if (!userAccessToken) {
                    const res = await axios.post('/api/refresh')
                    setUserAccessToken(res.data.accessToken)
                }

                if (!user) {
                    const userRes = await axiosInstance.get('/me')
                    setUser(userRes.data.user)
                }


            } catch (err) {
                console.log('err', err)
                clearUser()
                router.replace('/')

            } finally {
                setLoading(false)
            }
        }
        initToken()
    }, [setUserAccessToken, clearUser, router, setUser])

    if (loading) {
        return (
            <Loading />
        )
    }
    return <>{children}</>
}
