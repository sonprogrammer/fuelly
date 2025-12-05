'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import TodayMenuComponent from '@/app/components/TodayMenuComponent'
import GoalComponent from '@/app/components/GoalComponent'
import AddMenu from '@/app/components/AddMenu'
import AddCustomMenu from '@/app/components/AddCustomMenu'

export default function HomePage() {
    const user = useUserStore(state => state.user)
    const token = useUserStore.getState().userAccessToken
    console.log('userd From home page', user)

    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="flex gap-3 w-full">
                <section className="mb-3 pt-6 flex-1">
                    <h1 className="font-bold text-xl text-green-600 mb-2">fuelly</h1>
                    <h1 className='font-semibold'>
                        <span>{user?.nickName ? user?.nickName : user?.name}</span>
                        <span>님 환영합니다. 당신의 목표를 달성하세요</span>
                    </h1>
                </section>
                <section className="flex-1">
                    <GoalComponent goal={user?.goal} weight={user?.weight} />
                </section>
            </div>
            <div className="flex w-full gap-5">

                <AmountComponent />
                <AmountComponent />
            </div>
            
            <section>
                지피티가 말해줄 세 문장
            </section>
        </div>
    )
}