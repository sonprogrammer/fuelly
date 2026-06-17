'use client'

import {usePathname, useRouter} from 'next/navigation'
import {useUserStore} from '@/store/userStore'
import { toast } from 'react-hot-toast'

export default function HomeComponent () {
    const router = useRouter()
    const user = useUserStore(state => state.user)
    const pathname = usePathname()

    const handleClick = () => {
        if(user?.goal){
            router.replace('/home')
        }else if(pathname === '/survey'){
            toast.error('목표설정을 해주세요.')
        }else{
            router.push('/')
        }
    }

    return(
        <div onClick={handleClick}>
                <h1 className={` text-3xl sm:text-4xl font-black tracking-tighter`}>
                <button className=" cursor-pointer text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-pink-500 drop-shadow-md hover:opacity-70 transition-opacity">
                    FUELLY
                </button>
            </h1>
        </div>
    )
}