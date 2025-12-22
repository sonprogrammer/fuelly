'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { axiosInstance } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Loading from './Loading'

export default function ProtectUser({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const setUserAccessToken = useUserStore(state => state.setUserAccessToken)
    const clearUser = useUserStore(state => state.clearUser)


    useEffect(() => {
        const initToken = async () => {
            try {
                await axiosInstance.post('/autoLogin')
            } catch (err) {
                console.log('err',err)
                await axiosInstance.post('/Logout', {})
                clearUser()
                router.replace('/')

            } finally {
                setLoading(false)
            }
        }
        initToken()
    }, [setUserAccessToken, clearUser, router])

    if (loading) {
        return (
            <Loading />
        )
    }
    return <>{children}</>
}