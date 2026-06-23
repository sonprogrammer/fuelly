'use client'

import { useState } from 'react'
import GoalModalComponent from '../components/GoalModalComponent'


interface GoalProps {
    goal?: string
    weight?: number
    activity?: string
}

export default function GoalComponent({ goal, weight, activity }: GoalProps) {
    const [edit, setEdit] = useState<'weight' | 'goal' | 'activity' | null>(null)


    const goalMap: Record<string, string> = {
        bulk: '벌그업(근육 증가)',
        diet: '다이어트(체지방 감소)',
        maintain: '유지'
    }
    const goalName = goalMap[goal!] || goal

    const activityMap: Record<string, string> = {
        sedentary: '거의 운동 안함',
        light: '가벼운 운동(주 1~2회)',
        moderate: '보통 운동(주 3~5회)',
        active: '많이 운동(주 6회 이상)'
    }
    const activityName = activityMap[activity!] || activity
    return (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 relative">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">내 목표</h2>
            <p className="text-xs text-gray-600">클릭하여 수정</p>
        </div>

        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">목표</span>
                <button
                    aria-label='목표수정'
                    onClick={() => setEdit('goal')}
                    className="text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                    {goalName || '설정 필요'}
                </button>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">체중</span>
                <button
                    aria-label='몸무게 수정'
                    onClick={() => setEdit('weight')}
                    className="text-xs font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                    {weight ? `${weight}kg` : '설정 필요'}
                </button>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">운동량</span>
                <button
                    aria-label='활동량 수정'
                    onClick={() => setEdit('activity')}
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer
                        ${!activity
                            ? 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
                            : 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    {activityName || '설정 필요'}
                </button>
            </div>
        </div>

        {edit && (
            <div
                onClick={() => setEdit(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <GoalModalComponent
                        type={edit}
                        recentGoal={goal}
                        recentWeight={weight}
                        recentAtivity={activity}
                        onClose={() => setEdit(null)}
                    />
                </div>
            </div>
        )}
    </div>
    )
}