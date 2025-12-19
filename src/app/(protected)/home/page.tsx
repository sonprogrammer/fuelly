'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import GoalComponent from '@/app/components/GoalComponent'
import { Flame, Beef } from 'lucide-react'
import useGetDailyMessage from '@/hooks/useGetDailyMessage'
import useRemainNutrition from '@/hooks/useRemainNutrition'

export default function HomePage() {
    const user = useUserStore(state=> state.user)

    const { recommended, consumed, exceed} = useRemainNutrition(user)

    

    const message = useGetDailyMessage()
    
    const messages = message
        .split(/(?<=[.!?])\s+/)  
        .filter(Boolean)          
        .map(m => m.trim())


    
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
                    targetGrams={recommended.calorie ?? 0}
                    icon={<Flame className="h-4 w-4 text-orange-500" />}
                    currentGrams={consumed.dailyCalorie}
                    exceed={exceed.calorie}
                    />
                <AmountComponent 
                    name='단백질' 
                    targetGrams={recommended.protein ?? 0}
                    icon={<Beef className="h-4 w-4 text-red-500" />}
                    currentGrams={consumed.dailyProtein}
                    exceed={exceed.protein}
                />
            </div>
            
            <section className="backdrop-blur-lg bg-white/60 text-center flex flex-col justify-center shadow-md flex-1 rounded-xl p-5 overflow-y-auto">
                <h1 
                    className='text-xl font-bold mb-10'
                >
                    GROK(일론 머스크)의 응원
                </h1>
                {messages.map((m,i) => (
                    <p 
                        className="mb-2 animate-fade-in bg-clip-text text-transparent bg-linear-to-r from-red-500 via-yellow-500 to-amber-800"
                        style={{ animationDelay: `${i * 0.3}s` }}
                        key={`${m}-${i}`}
                    >
                        {m}
                    </p>

                ))}
            </section>
        </div>
    )
}