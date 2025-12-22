'use client'


import {useUserStore} from '@/store/userStore'
import { useRouter } from "next/navigation"
import { axiosInstance } from '@/lib/axios'
import { LogOut } from 'lucide-react'


export default function LogoutComponent() {
    const user = useUserStore(state => state.user)
    const clearUser = useUserStore(state => state.clearUser)
    const router = useRouter()
    if(!user) return null

    const handleLogout = async () => {
        await axiosInstance.post('/Logout', {})
        clearUser()
        router.push('/')
    }
    return(
        <button 
            onClick={handleLogout}
            className="group flex items-center justify-center p-2.5 rounded-xl transition-all duration-200 
                       hover:bg-red-50 active:scale-95 shadow-sm border border-transparent hover:border-red-100"
            aria-label="로그아웃"
        >
            <LogOut 
                className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" 
            />
        </button>
    )
}