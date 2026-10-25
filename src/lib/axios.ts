'use client'

import { useUserStore } from '@/store/userStore'
import axios from 'axios'
import { toast } from 'react-hot-toast'


export const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use(
    async config => {
        //!요청시마다 토큰을 넣음
        const token = useUserStore.getState().userAccessToken
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error)
)

interface QueueItem {
    res: (value: string | null) => void;
    rej: (error: Error) => void;
}

let isRefreshing = false;
let isLoggingOut = false
let failedQueue: QueueItem[] = [];

export const setLogoutInProgress = (value: boolean) => {
    isLoggingOut = value
}

const processQueue = (error: Error | null, token: string | null = null): void => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.rej(error);
        } else {
            promise.res(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config

        if (isLoggingOut || !originalRequest || err.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(err)
        }

        if (isRefreshing) {
            return new Promise((res, rej) => {
                failedQueue.push({ res, rej })
            }).then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return axiosInstance(originalRequest)
            })

        }

        originalRequest._retry = true
        isRefreshing = true

        const setUserAccessToken = useUserStore.getState().setUserAccessToken
        try {

            const res = await axios.post('/api/refresh')

            if(isLoggingOut){
                throw new Error('로그아웃 진행 중')
            }

            const newAccessToken = res.data.accessToken


            if (newAccessToken) {
                setUserAccessToken(newAccessToken)

                originalRequest.headers.set('Authorization',`Bearer ${newAccessToken}`)

                processQueue(null, newAccessToken)

                return axiosInstance(originalRequest)
            } else {
                throw new Error('no access token received')
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('토큰 재발급 실패')
            processQueue(error, null)

            if(isLoggingOut){
                return Promise.reject(err)
            }
            useUserStore.getState().clearUser()
            if (typeof window !== 'undefined') {
                toast.error('세션 만료 재로그인하세요')
                window.location.href = '/'
            }
            return Promise.reject(err)
        } finally {
            isRefreshing = false
        }
    }
)