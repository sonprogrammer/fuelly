'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginSection from './LoginSection'
import { axiosInstance } from '@/lib/axios'
import Loading from '@/app/components/Loading'
import { useUserStore } from '@/store/userStore'

export default function LandingComponent({ hasRefreshToken }: { hasRefreshToken: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const setUserAccessToken = useUserStore(state => state.setUserAccessToken)





  useEffect(() => {
    if (!hasRefreshToken) return
    const autoLogin = async () => {
      try {
        const res = await axiosInstance.post('/autoLogin')
        setUserAccessToken(res.data.accessToken)
        router.replace('/home')
      } catch (err) {
        console.log('faile', err)
        setLoading(false)
      }
    }
    autoLogin()
  }, [router, hasRefreshToken])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="h-full">
      <LoginSection />

    </div>
  )
}