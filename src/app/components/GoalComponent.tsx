'use client'

import { useState } from 'react'
import GoalModalComponent from '../components/GoalModalComponent'
interface GoalProps {
    goal?: string
    weight?: number
}

export default function GoalComponent({ goal, weight }: GoalProps) {
    const [edit, setEdit] = useState<'weight' | 'goal' | null>(null)


    const goalMap: Record<string, string> = {
        bulk: '벌그업(근육 증가)',
        diet: '다이어트(체지방 감소)',
        maintain: '유지'
    }
    const goalName = goalMap[goal!] || goal
    return (
        <div className='border border-green-400 p-5 rounded-md flex justify-between relative'>
            <section>

                <h1 className=''>현재 목표</h1>
                <button
                    onClick={() => setEdit('goal')}
                    className='bg-black text-white text-sm p-2 rounded-lg mt-2 cursor-pointer'
                >
                    {goalName}
                </button>
            </section>

            <section className='flex flex-col items-center justify-center'>

                <h1>체중</h1>
                <button
                    onClick={() => setEdit('weight')}
                    className="font-bold cursor-pointer"
                >
                    {weight}kg
                </button>
            </section>

            {edit && (
                <div 
                    onClick={() => setEdit(null)}
                    className='inset-0 fixed flex items-center justify-center bg-black/50 z-50'
                    >
                    <div onClick={(e)=>e.stopPropagation()}>
                        <GoalModalComponent type={edit} recentGoal={goal} recentWeight={weight} onClose={() => setEdit(null)} />
                    </div>
                </div>

            )}


        </div>
    )
}