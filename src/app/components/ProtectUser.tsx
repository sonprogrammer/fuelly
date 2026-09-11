'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import { useShallow } from 'zustand/react/shallow'
import axios from 'axios'
import { axiosInstance } from '@/lib/axios'


export default function ProtectUser({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const { user, setUser, userAccessToken, setUserAccessToken, clearUser } = useUserStore(useShallow(state => ({
        user: state.user,
        setUser: state.setUser,
        userAccessToken: state.userAccessToken,
        setUserAccessToken: state.setUserAccessToken,
        clearUser: state.clearUser
    })))


    useEffect(() => {
        const initToken = async () => {

            try {
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
    }, [setUserAccessToken, clearUser, router, userAccessToken, user, setUser])

    if (loading) {
        return (
            <Loading />
        )
    }
    return <>{children}</>
}
