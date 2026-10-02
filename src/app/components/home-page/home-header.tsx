'use client'

import GoalComponent from "@/app/components/GoalComponent";
import { useUserStore } from "@/store/userStore";

export function HomeHeader() {
    const user = useUserStore(state => state.user)
    return (
        <header className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                    <p className="mb-2 text-xs font-medium tracking-widest text-emerald-500 uppercase">FUELLY</p>
                    <h1 className="text-2xl font-bold leading-snug text-white">
                        <span className="text-emerald-400">{user?.nickName || user?.name}</span>님, 환영합니다.
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        오늘도 기록을 쌓고 목표에 한 걸음 더 가까워져 보세요.
                    </p>
                </div>

                <GoalComponent
                    goal={user?.goal}
                    weight={user?.weight}
                    activity={user?.activity}
                    height={user?.height}
                />
            </div>
        </header>
    )
}