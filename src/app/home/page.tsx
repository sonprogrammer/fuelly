'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import GoalComponent from '@/app/components/GoalComponent'
import { useMemo } from "react";
import amountCalculate from '@/utils/amountCalculate'
import { Flame, Beef } from 'lucide-react'

export default function HomePage() {
    const user = useUserStore(state => state.user)
    // const token = useUserStore.getState().userAccessToken
    console.log('userd From home page', user)

    const target = useMemo(() => {
        if (
            !user ||
            user.height == null ||
            user.weight == null ||
            user.gender == null ||
            user.goal == null ||
            user.age == null ||
            user.activity == null
        ) {
            return null;
        }
    
        return amountCalculate({
            height: user.height,
            weight: user.weight,
            gender: user.gender,
            activity: user.activity,
            goal: user.goal,
            age: user.age,
        });
    }, [user])

    
    return (
        <div className="flex flex-col gap-5 p-5 h-full">
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

                <AmountComponent 
                    name='칼로리'
                    targetGrams={target?.recommendedCalroies ?? 0}
                    icon={<Flame className="h-4 w-4 text-orange-500" />}
                    currentGrams={0}
                    />
                <AmountComponent 
                    name='단백질' 
                    targetGrams={target?.recommendedProteins ?? 0}
                    icon={<Beef className="h-4 w-4 text-red-500" />}
                    currentGrams={0}
                />
            </div>
            
            <section className="backdrop-blur-lg bg-white/60 text-center flex flex-col justify-center shadow-md flex-1 rounded-xl p-5 overflow-y-auto">
                <h2>ChatGPT의 말: 응원할 말이 들어갈곳 </h2>
                <p>오늘도 힘내시고 화이팅</p>
            </section>
        </div>
    )
}