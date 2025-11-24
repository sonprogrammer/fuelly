

import { useUserStore } from '@/store/userStore'
import axios from 'axios'
import { error } from 'console'

axios.interceptors.request.use(
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


axios.interceptors.response.use(

)