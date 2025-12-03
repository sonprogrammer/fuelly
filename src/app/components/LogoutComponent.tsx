'use client'
// TODO 나중에 수정 

import {useUserStore} from '@/store/userStore'
import { useRouter } from "next/navigation"
import { axiosInstance } from '@/lib/axios'

export default function LogoutComponent() {
    const clearUser = useUserStore(state => state.clearUser)
    const router = useRouter()

    const handleLogout = async () => {
        await axiosInstance.post('/Logout', {})
        clearUser()
        router.push('/')
    }
    return(
        <div onClick={handleLogout}>
            logout
        </div>
    )
}