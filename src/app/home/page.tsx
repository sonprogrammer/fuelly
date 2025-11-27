'use client'

import { useUserStore } from "@/store/userStore"


export default function HomePage(){
    const user = useUserStore(state => state.user)
    const token =useUserStore.getState().userAccessToken
    console.log('user', token)

    return(
        <div>
            <h1>{user?.nickName}</h1>
            <p>{user?.objectId}</p>
            <h3>{user?.goal}</h3>
        </div>
    )
}