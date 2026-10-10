'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

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
            className="cursor-pointer flex items-center gap-2 font-bold tracking-tight text-emerald-500 hover:opacity-70 transition-opacity"

        >
            <Image src='/fuellyRun.png' width={40} height={40} alt='로고'/>
            <h1>FUELLY</h1>
        </button>
    )
}