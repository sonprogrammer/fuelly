

import { jwtVerify } from 'jose'

import {cookies} from 'next/headers'
import { redirect } from 'next/navigation'
import LoginSection from '@/app/components/LoginSection'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
)


export default async function LandingPage() {
    const cookie = await cookies()
    const refreshToken = cookie.get('refreshToken')?.value

    let isValidRefresh = false

    if(!!refreshToken){
      try {
        await jwtVerify(refreshToken, JWT_SECRET)
        isValidRefresh = true
      } catch (error) {
        console.error(error)
      }
    }
    if(isValidRefresh){
      redirect('/home')
    }

  return (
    <LoginSection />  
  )
}
