'use client'


import { GoalComponent } from "@/app/components/goal";
import { useUserStore } from "@/store/userStore";

export function HomeHeader() {
    const user = useUserStore(state => state.user)
    return (
        <header className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium tracking-widest text-emerald-500 uppercase">
            FUELLY
          </p>
          <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl">
            <span className="text-emerald-400">
              {user?.nickName || user?.name}
            </span>
            님, 환영합니다.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            오늘도 기록을 쌓고 목표에 한 걸음 더 가까워져 보세요.
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[300px]">
          <GoalComponent
            goal={user?.goal}
            weight={user?.weight}
            activity={user?.activity}
            height={user?.height}
          />
        </div>
      </div>
    </header>
    )
}