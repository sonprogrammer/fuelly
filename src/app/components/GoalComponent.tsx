'use client'

import { useState } from 'react'
import GoalModalComponent from '../components/GoalModalComponent'
import { createPortal } from 'react-dom'


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
        <div className='rounded-xl border border-green-200 bg-white/10 shadow-sm p-6 transition hover:shadow-lg'>
            <section className='w-full space-y-2'>

                <div className='flex items-center justify-between w-full'>
                    <h1 className='font-semibold'>현재 목표</h1>
                    <button
                        onClick={() => setEdit('goal')}
                        className='flex items-center gap-1 font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer'
                    >
                        {goalName}
                    </button>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <h1 className='font-semibold'>체중</h1>
                    <button
                        onClick={() => setEdit('weight')}
                        className="flex items-center gap-1 font-semibold text-gray-800 hover:text-black transition-colors cursor-pointer"
                    >
                        {weight}kg
                    </button>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <h1 className='font-semibold'>운동량</h1>
                    <button
                        onClick={() => setEdit('activity')}
                        className='flex items-center gap-1 font-semibold text-gray-800 hover:text-black transition-colors cursor-pointer'>
                        {activityName}
                    </button>
                </div>

            </section>
            <p className='text-xs text-gray-500 text-end absolute bottom-1 left-5'>*각 항목을 클릭하여 수정할 수 있습니다.</p>

            {edit && (
                <div
                    onClick={() => setEdit(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
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