'use client'

import { useUserStore } from '@/store/userStore'
import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use(
    async config => {
        //!요청시마다 토큰을 넣음
        const token = useUserStore.getState().userAccessToken
        if(!token){
            if(!isRefreshing){
                isRefreshing = true
                try{
                    const res = await axios.post('/api/refresh')
                    const newToken = res.data.accessToken

                    if(newToken){
                        useUserStore.getState().setUserAccessToken(newToken)
                        config.headers = config.headers ?? {}
                        config.headers.Authorization = `Bearer ${newToken}`
                        processQueue(null, newToken)
                    }
                }catch(err){
                    processQueue(err as Error, null)
                    useUserStore.getState().setUserAccessToken(null)
                    
                }finally {
                    isRefreshing = false
                  }
            }
        }
        if(token && config.headers){
            config.headers.Authorization =`Bearer ${token}`
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
    async(err) => {
        const originalRequest = err.config
        // console.log('err', err)

        if(err.response?.status !== 401 || originalRequest._retry){
            return Promise.reject(err)
        }

        if(isRefreshing){
            return new Promise((res, rej) => {
                failedQueue.push({res, rej})
            }).then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return axiosInstance(originalRequest)
            })
            
        }

        originalRequest._retry = true
        isRefreshing = true

        const setUserAccessToken = useUserStore.getState().setUserAccessToken
        try{
            const res = await axios.post('/api/refresh')
            
            const newAccessToken = res.data.accessToken

            
            if(newAccessToken){
                setUserAccessToken(newAccessToken)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                processQueue(null, newAccessToken)

                return axiosInstance(originalRequest)
            }else{
                throw new Error('no access token received')
            }
        }catch(err){
            processQueue(err as Error, null)
            setUserAccessToken(null)
            useUserStore.getState().clearUser()
            if(typeof window !== 'undefined'){
                alert('세션 만료 재로그인하세요')
                window.location.href = '/login'
            }
            return Promise.reject(err)
        }finally{
            isRefreshing = false
        }
    }
)