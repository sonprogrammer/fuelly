'use client'


import { useUserStore } from '@/store/userStore'
import { axiosInstance, setLogoutInProgress } from '@/lib/axios'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'


export default function LogoutComponent() {
    const userAccessToken = useUserStore(state => state.userAccessToken)
    const clearUser = useUserStore(state => state.clearUser)
    const [isPending, setIsPending] = useState(false)

    const handleLogout = async () => {

        if (isPending) return
        setIsPending(true)
        setLogoutInProgress(true)
        try {
            await axios.post('/Logout', {})
            clearUser()
            window.location.replace('/')
        } catch (error) {
            setLogoutInProgress(false)
            setIsPending(false)
            console.error('로그아웃 실패', error)
            toast.error('로그아웃 하지 못했습니다. 다시 시도해주세요')
        }
    }

        if (!userAccessToken) return null

    return (
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