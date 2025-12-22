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
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto min-h-full mb-10 sm:mb-0 bg-gray-50/50">
            
            <header className="flex flex-col md:flex-row gap-6 items-start md:items-stretch">
                <section className="flex-1 w-full bg-white p-6 rounded-4xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h1 className="font-black text-2xl text-emerald-600 mb-1 tracking-tighter">FUELLY</h1>
                    <div className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                        <span className="text-emerald-500">{user?.nickName || user?.name}</span>님, 환영합니다.
                        <p className="text-sm md:text-base font-medium text-gray-400 mt-2">오늘도 당신의 목표에 한 발짝 더 가까워지세요.</p>
                    </div>
                </section>
                
                <section className="flex-1 w-full">
                    <GoalComponent goal={user?.goal} weight={user?.weight} activity={user?.activity} />
                </section>
            </header>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-4xl p-1 shadow-sm border border-gray-100 transition-hover hover:shadow-md">
                    <AmountComponent 
                        name='칼로리'
                        targetGrams={recommended.calorie ?? 0}
                        icon={<Flame className="h-5 w-5 text-orange-500" />}
                        currentGrams={consumed.dailyCalorie}
                        exceed={exceed.calorie}
                    />
                </div>
                <div className="bg-white rounded-4xl p-1 shadow-sm border border-gray-100 transition-hover hover:shadow-md">
                    <AmountComponent 
                        name='단백질' 
                        targetGrams={recommended.protein ?? 0}
                        icon={<Beef className="h-5 w-5 text-red-500" />}
                        currentGrams={consumed.dailyProtein}
                        exceed={exceed.protein}
                    />
                </div>
            </div>
            
            <section className="relative overflow-hidden bg-white rounded-4xl p-8 shadow-xl shadow-emerald-900/5 border border-emerald-50">

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6 justify-center ">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h1 className=' text-lg md:text-xl font-black text-gray-800 tracking-tight'>
                            AI 코치의 오늘 한마디
                        </h1>
                    </div>

                    <div className="space-y-3">
                        {messages.map((m, i) => (
                            <p 
                                key={`${m}-${i}`}
                                className=" text-center md:text-lg font-bold animate-in fade-in slide-in-from-bottom-2 duration-700 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-teal-500 to-blue-600"
                                style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'both' }}
                            >
                                {`"${m}"`}
                            </p>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}