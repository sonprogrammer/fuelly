'use client'

import { useEffect, useState} from 'react'
import {useRouter } from 'next/navigation'
import LoginSection from './LoginSection'
import {axiosInstance} from '@/lib/axios'
import Loading from '@/app/components/Loading'

export default function LandingComponent({hasRefreshToken}: {hasRefreshToken: boolean}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    


    useEffect(() => {
        if(!hasRefreshToken) return
      const autoLogin = async() => {
        try{
          await axiosInstance.post('/autoLogin')
          router.replace('/home')
        }catch(err){
          console.log('faile', err)
          setLoading(false)
        }
      }
      autoLogin()
    },[router, hasRefreshToken])

    if(loading){
      return <Loading />
    }
  
    return (
      <div className="h-full">
        <LoginSection />
      
      </div>
    )
}