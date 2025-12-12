'use client'

import { useEffect} from 'react'
import {useRouter } from 'next/navigation'
import LoginSection from './LoginSection'
import {axiosInstance} from '@/lib/axios'

export default function LandingComponent({hasRefreshToken}: {hasRefreshToken: boolean}) {
    const router = useRouter()


    useEffect(() => {
        if(!hasRefreshToken) return
      const autoLogin = async() => {
        try{
          await axiosInstance.post('/autoLogin')
          router.push('/home')
        }catch(err){
          console.log('faile', err)
        }
      }
      autoLogin()
    },[router, hasRefreshToken])
  
    return (
      <div className="h-full">
        <LoginSection />
      
      </div>
    )
}