

import LandingComponent from './components/LandingComponent'
import {cookies} from 'next/headers'

export default async function LandingPage() {
    const cookie = await cookies()
    const refreshToken = cookie.get('refreshToken')

  return (
    <LandingComponent hasRefreshToken={!!refreshToken}/>  
  )
}
