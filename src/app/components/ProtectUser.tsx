'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore'
import Loading from './Loading'
import axios from 'axios'
import { axiosInstance } from '@/lib/axios'
import { handleAuthExpired, isRefreshRecoveryFailed, refreshAccessToken } from '@/lib/auth/refresh-access-token'
import toast from 'react-hot-toast'
import { retryRequest } from '@/lib/auth/retry-request'
import { LoginError } from '@/app/components/auth/LoginError'

type AuthStatus = 'checking' | 'authenticated' | 'error'


export default function ProtectUser({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>('checking')
    const [retryCount, setRetryCount] = useState(0)


    useEffect(() => {
        let active = true
        const initToken = async () => {
            if (isRefreshRecoveryFailed()) {
                setStatus('error')
                return
            }
            try {
                const { userAccessToken, user } = useUserStore.getState()
                if (!userAccessToken) {
                    await refreshAccessToken()
                }

                if (!user) {
                    const userRes = await retryRequest(() => axiosInstance.get('/me'))
                    if (!active) return
                    useUserStore.getState().setUser(userRes.data.user)
                }
                if (active) setStatus('authenticated')

            } catch (err) {
                if (!active) return
                const status = axios.isAxiosError(err) ? err.response?.status : undefined

                if (status === 401) {
                    handleAuthExpired()
                    return
                }
                console.error('failed to authenticate', err)
                toast.error('서버 연결 문제 발생 ')
                setStatus('error')

            }
        }
        initToken()
        return () => {
            active = false
        }

    }, [retryCount])

    useEffect(() => {
        if (status !== 'error' || isRefreshRecoveryFailed()) return
        let retrying = false

        const retryAuth = () => {
            if (retrying || !navigator.onLine) return
            retrying = true
            setStatus('checking')
            setRetryCount(prev => prev + 1)
        }

        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                retryAuth()
            }
        }
        window.addEventListener('online', retryAuth)
        document.addEventListener('visibilitychange', handleVisibility)
        const timer = window.setTimeout(retryAuth, 10000)

        return () => {
            window.removeEventListener('online', retryAuth)
            document.removeEventListener('visibilitychange', handleVisibility)
            window.clearTimeout(timer)
        }
    }, [status])

    if (status === 'checking') {
        return (
            <Loading />
        )
    }

    if (status === 'error') {
        return <LoginError requiresRelogin={isRefreshRecoveryFailed()} />
    }



    return <>{children}</>
}
