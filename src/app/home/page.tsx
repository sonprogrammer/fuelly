'use client'

import { useUserStore } from "@/store/userStore"


export default function HomePage(){
    const user = useUserStore(state => state.user)
    console.log('user', user)

    return(
        <div>
            
        </div>
    )
}