'use client'

import { useUserStore } from "@/store/userStore"
import AmountComponent from '@/app/components/AmountComponent'
import GoalComponent from '@/app/components/GoalComponent'
import { Flame, Beef, Sparkles } from 'lucide-react'
import useRemainNutrition from '@/hooks/useRemainNutrition'
import { useState } from "react"
import { useGetDailyMessage } from "@/hooks/useGetDailyMessage"
import { ReqMsgModal } from "@/app/components/ReqMsgModal"

export default function HomePage() {
    const user = useUserStore(state => state.user)
    const { recommended, consumed, exceed } = useRemainNutrition(user)
    const [reqModalOpen, setReqModalOpen] = useState(false)

    const { data: fetchMsg, isPending: fetchingMsg } = useGetDailyMessage()

    const defaultMessage = "오늘의 작은 변화가 더 큰 성장을 만든다.\nNo matter what, just do it.";
    const displayMsg = fetchMsg.answer || defaultMessage 


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
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <h2 className="text-sm font-semibold text-white">AI 코치의 오늘 한마디</h2>
                    </div>
                    {!fetchMsg || !fetchMsg.alreadyExist && (
                        <div>
                            <button
                                onClick={() => setReqModalOpen(true)}
                                className="text-purple-400 text-xs cursor-pointer hover:bg-purple-500/30 p-3 rounded-xl">
                                응원 요청하기
                            </button>
                            <p className="text-gray-300 text-[8px]">*일일 1회 요청가능합니다.</p>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-800/50 rounded-xl mb-4">
                        <p className="text-white text-center whitespace-pre-line">
                            {fetchingMsg ? "불러오는 중..." : displayMsg}
                        </p>
                    </div>


                    {reqModalOpen &&

                            <ReqMsgModal
                                onClose={() => setReqModalOpen(false)}
                            />

                    }

                </div>
            </section>
        </div>

    )
}