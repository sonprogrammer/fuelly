'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { toast } from 'react-hot-toast'

export default function HomeComponent() {
    const router = useRouter()
    const user = useUserStore(state => state.user)
    const pathname = usePathname()

    const handleClick = () => {
        if (user?.goal) {
            router.replace('/home')
        } else if (pathname === '/survey') {
            toast.error('목표설정을 해주세요.')
        } else {
            router.push('/')
        }
    }

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer text-base font-bold tracking-tight text-white hover:opacity-70 transition-opacity"

        >
            FUELLY
        </button>
    )
}