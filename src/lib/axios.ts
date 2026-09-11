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

        console.log('요청:', config)
        console.log('현재 accessToken:', token)
        
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
let failedQueue: QueueItem[] = [];

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

        if (err.response?.status !== 401 || originalRequest._retry) {
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
            console.log('🔥 refresh 요청 시작')

            const res = await axios.post('/api/refresh')

            console.log('🔥 refresh 응답', res.data)

            const newAccessToken = res.data.accessToken


            if (newAccessToken) {
                setUserAccessToken(newAccessToken)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                processQueue(null, newAccessToken)

                return axiosInstance(originalRequest)
            } else {
                throw new Error('no access token received')
            }
        } catch (err) {
            processQueue(err as Error, null)
            setUserAccessToken(null)
            useUserStore.getState().clearUser()
            if (typeof window !== 'undefined') {
                toast.error('세션 만료 재로그인하세요')
                window.location.href = '/login'
            }
            return Promise.reject(err)
        } finally {
            isRefreshing = false
        }
    }
)