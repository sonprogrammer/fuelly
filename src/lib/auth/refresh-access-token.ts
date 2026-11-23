
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { retryRequest } from "@/lib/auth/retry-request";

let refreshPromise: Promise<string> | null = null
let isLoggingOut = false
let isSessionExpired = false

let refreshRecoveryFailed = false

export const isRefreshRecoveryFailed = () => {
    return refreshRecoveryFailed || sessionStorage.getItem('refreshRecoveryFailed') === 'true'
}


export const setLogoutInProgress = (value: boolean) => {
    isLoggingOut = value
}



export const refreshAccessToken = (): Promise<string> => {
    if (isLoggingOut) {
        return Promise.reject(new Error('progressing logout'))
    }
    if (refreshPromise) {
        return refreshPromise
    }

    const requestId = crypto.randomUUID()

    refreshPromise = retryRequest(() => axios.post('/api/refresh', null, {
        headers: {
            'Idempotency-Key': requestId
        }, timeout: 3000
    }), 4
    ).then(res => {
        if (isLoggingOut) {
            throw new Error('progressing logout')
        }
        const token = res.data.accessToken
        if (typeof token !== 'string' || !token) {
            throw new Error('there is no accessToken')
        }
        useUserStore.getState().setUserAccessToken(token)
        refreshRecoveryFailed = false
        sessionStorage.removeItem('refreshRecoveryFailed')
        return token
    }).catch(err => {
        const status = axios.isAxiosError(err) ? err.response?.status : undefined

        if (status === 401) {
            refreshRecoveryFailed = false
            sessionStorage.removeItem('refreshRecoveryFailed')
            throw err
        }
        
        refreshRecoveryFailed = true
        sessionStorage.setItem('refreshRecoveryFailed', 'true')
        throw err
    }).finally(() => {
        refreshPromise = null
    })

    return refreshPromise
}

export const handleAuthExpired = () => {
    if (isLoggingOut || isSessionExpired) return

    isSessionExpired = true
    useUserStore.getState().clearUser()

    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.replace('/')
    }
}