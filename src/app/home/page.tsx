'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import TodayMenuComponent from '@/app/components/TodayMenuComponent'
import GoalComponent from '@/app/components/GoalComponent'
import AddMeunu from '@/app/components/AddMenu'
import AddCustomMenu from '@/app/components/AddCustomMenu'

export default function HomePage() {
    const user = useUserStore(state => state.user)
    const token = useUserStore.getState().userAccessToken
    console.log('user', token)

    return (
        <div className="p-5 flex flex-col gap-5 bg-gradient-to-br from-green-50 to-blue-50">
            <header className="mb-3 pt-6">
                <h1 className="font-bold text-xl text-green-600 mb-2">fuelly</h1>
                <h1 className='font-semibold'>
                    <span>{user?.nickName}</span>
                    <span>님 환영합니다. 당신의 목표를 달성하세요</span>
                </h1>
            </header>
            <div className="flex w-full gap-5">

                <AmountComponent />
                <AmountComponent />
            </div>
            <TodayMenuComponent />
            <GoalComponent goal={user?.goal} weight={user?.weight} />
            <AddMeunu />
            <AddCustomMenu />
        </div>
    )
}