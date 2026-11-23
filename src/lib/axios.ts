'use client'

import { handleAuthExpired, refreshAccessToken } from '@/lib/auth/refresh-access-token'
import { useUserStore } from '@/store/userStore'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-hot-toast'

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}



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


axiosInstance.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config as RetryConfig | undefined

        if (!originalRequest || err.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(err)
        }

        originalRequest._retry = true
        try {
            const currentToken = useUserStore.getState().userAccessToken
            //과거 api요청시 보낸 토큰
            const sentToken = originalRequest.headers.get('Authorization')
            const newAccessToken = currentToken && sentToken !== `Bearer ${currentToken}`
                                    ? currentToken : await refreshAccessToken()

            originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`)
            return await axiosInstance(originalRequest)
        } catch (err) {
            const status = axios.isAxiosError(err) ? err.response?.status : undefined

            if(status === 401){
                handleAuthExpired()
                toast.error('세션이 만료되었습니다. 다시 로그인 해주세요')
            }else if((status === undefined || status >= 500) && axios.isAxiosError(err)){
                toast.error('인증 서버에 연결 할 수 없습니다')
            } 

            return Promise.reject(err)
        }
    }
)