'use client'

import {useEffect, useState} from 'react'
import {useUserStore} from '@/store/userStore'
import {axiosInstance } from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function ProtectUser({children}: {children: React.ReactNode}){
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const setUserAccessToken = useUserStore(state=> state.setUserAccessToken)

    useEffect(() => {
        const initToken = async ()=> {
            try{
                const res = await axiosInstance.post('/autoLogin')
                setLoading(true)
                console.log('res', res)
            }catch(err){
                console.log('err')
                
            }finally{
                setLoading(false)
            }
        }   
        initToken()
    },[setUserAccessToken])

    // TODO 로딩 아이콘 띄우기
    if(loading){
        return(
            <div>
                loading....
            </div>
        )
    }
    return <>{children}</>
}