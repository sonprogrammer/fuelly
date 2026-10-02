'use client'

import GoalComponent from "@/app/components/GoalComponent";
import { useUserStore } from "@/store/userStore";

export function HomeHeader() {
     const user = useUserStore(state => state.user)
    return (
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
    )
}