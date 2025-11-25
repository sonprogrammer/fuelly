'use client'

import { useUserStore } from '@/store/userStore'
import axios from 'axios'
import { error } from 'console'

export const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use(
    config => {

        //!요청시마다 토큰을 넣음
        const token = useUserStore.getState().userAccessToken
        if(token && config.headers){
            config.headers.Authorization =`Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
    res => res,
    async(err) => {
        const originalRequest = err.config
        console.log('err', err)

        if(err.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            console.log('expired accesstoken. ')
        }

        return Promise.reject(err)
    }
)