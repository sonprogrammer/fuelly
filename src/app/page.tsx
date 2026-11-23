import { jwtVerify } from 'jose'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginSection } from '@/app/components/LoginSection'
import { redis } from '@/lib/redis'
import { redisKeys } from '@/lib/redis-keys'
import { hashToken } from '@/lib/hashToken'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
)

interface RefreshSession{
  userId: string
  tokenHash: string
}


export default async function LandingPage() {
  const cookie = await cookies()
  const refreshToken = cookie.get('fuellyRefreshToken')?.value

  let isValidRefresh = false
  
  if(refreshToken){
    try {
      const { payload} = await jwtVerify(refreshToken, JWT_SECRET)

      if(payload.jti && typeof payload.objectId === 'string'){
        const session = await redis.get<RefreshSession>(redisKeys.session(payload.jti))

        isValidRefresh = session?.userId === payload.objectId &&
                        session.tokenHash === hashToken(refreshToken)
      }
    } catch (error) {
      console.error('validate refresh token failed',error)
    }  
  }

  if (isValidRefresh) {
    redirect('/home')
  }

  return (
    <LoginSection />
  )
}
