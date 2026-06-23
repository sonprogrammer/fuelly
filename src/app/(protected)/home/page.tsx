'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import GoalComponent from '@/app/components/GoalComponent'
import { Flame, Beef, Sparkles } from 'lucide-react'
import useGetDailyMessage from '@/hooks/useGetDailyMessage'
import useRemainNutrition from '@/hooks/useRemainNutrition'

export default function HomePage() {
    const user = useUserStore(state => state.user)
    const { recommended, consumed, exceed } = useRemainNutrition(user)

    const message = useGetDailyMessage()
    const messages = message
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean)
        .map(m => m.trim())

    return (
        <div className="flex flex-col gap-5 p-5 md:p-8 max-w-5xl mx-auto min-h-full mb-10 sm:mb-0">

            <header className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 tracking-widest uppercase mb-2">FUELLY</p>
                        <h1 className="text-2xl font-bold text-white leading-snug">
                            <span className="text-emerald-400">{user?.nickName || user?.name}</span>님, 환영합니다.
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">오늘도 목표에 한 발짝 더 가까워지세요.</p>
                    </div>
                    <GoalComponent goal={user?.goal} weight={user?.weight} activity={user?.activity} />
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 hover:border-gray-700 transition-colors">
                    <AmountComponent
                        name='칼로리'
                        targetGrams={recommended.calorie ?? 0}
                        icon={<Flame className="h-5 w-5 text-orange-500" />}
                        currentGrams={consumed.dailyCalorie}
                        exceed={exceed.calorie}
                    />
                </div>
                <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 hover:border-gray-700 transition-colors">
                    <AmountComponent
                        name='단백질'
                        targetGrams={recommended.protein ?? 0}
                        icon={<Beef className="h-5 w-5 text-red-500" />}
                        currentGrams={consumed.dailyProtein}
                        exceed={exceed.protein}
                    />
                </div>
            </div>


            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <h2 className="text-sm font-semibold text-white">AI 코치의 오늘 한마디</h2>
                </div>
                <div className="space-y-2">
                    {messages.map((m, i) => (
                        <p
                            key={`${m}-${i}`}
                            className="text-sm text-center text-gray-400 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700"
                            style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'both' }}
                        >
                            {`"${m}"`}
                        </p>
                    ))}
                </div>
            </section>
        </div>

    )
}