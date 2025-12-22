'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'
import useUpdatedUserInfo from '@/hooks/useUpdateUserInfo'
import { toast } from 'react-hot-toast'
interface ModalProps {
    type: string | null
    onClose: () => void
    recentGoal?: string
    recentWeight?: number
    recentAtivity?: string
}
type GoalLabel = 'bulk' | 'diet' | 'maintain'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active'
interface Goal {
    name: string
    label: GoalLabel
}

interface Activity {
    name : string
    label: ActivityLevel
}

export default function GoalModalComponent({ type, onClose, recentGoal, recentWeight, recentAtivity }: ModalProps) {
    const [weight, setWeight] = useState<string>(String(recentWeight ?? ""))
    const [updatedGoal, setUpdatedGoal] = useState<GoalLabel | null>(null)
    const [activity, setActivity] =useState<ActivityLevel | null>(null)

    const {mutate: updateMutate} = useUpdatedUserInfo()
    
    const goals: Goal[] = [
        { name: '벌그업(근육 증가)', label: 'bulk' },
        { name: '다이어트(체지방 감소)', label: 'diet' },
        { name: '유지', label: 'maintain' }
    ]
    console.log('type', type)

    const activities: Activity[] =[
        {name: '거의 운동 안함', label: 'sedentary'},
        {name: '가벼운 운동(주 1~2회)', label: 'moderate'},
        {name: '보통 운동(주 3~5회)', label: 'light'},
        {name: '많이 운동(주 6회 이상)', label: 'active'},
    ]

    const handleSubmitClick = () => {
        if (type === 'goal' && updatedGoal) {
            updateMutate(
                { goal: updatedGoal },
                { onSuccess: () => {
                    toast.success('목표가 수정되었습니다!')
                    onClose()
                }
                }
                
            )
        }
        
        if (type === 'weight' && weight) {
            console.log('updatedWeigh', weight)
            updateMutate(
                { weight: Number(weight) },
                { onSuccess: () => {
                    toast.success('체중 기록 완료!')
                    onClose() }
                }
            )
        }
    
        if (type === 'activity' && activity) {
            updateMutate(
                { activity },
                { onSuccess: () => {
                    toast.success('운동량이 업데이트되었습니다!')
                    onClose()
                    } 
                }
            )
        }
    }
    

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col bg-white rounded-xl p-5 shadow-xl max-w-md sm:max-w-lg"
            >
                <button
                    onClick={onClose}
                    className='absolute top-3 right-3 w-6 h-6  bg-black text-white rounded-full cursor-pointer'
                >X</button>
                <h1 className='text-center mb-3 font-bold'>
                    {type === 'weight' ? '체중 수정' : type === 'goal'? '목표 수정' : '운동량 수정'}
                </h1>
                {type === 'goal' ?
                    <section>
                        {goals.map(g => (
                            <button
                                key={g.name}
                                className={`bg-stone-50 w-full text-start 
                                rounded-xl border border-gray-300 px-3 py-2 mb-2 
                                ${updatedGoal === g.label && 'border-teal-500 bg-teal-50'}
                                `}
                                onClick={() => setUpdatedGoal(g.label)}
                            >
                                {g.name}
                            </button>
                        ))}
                        <button 
                            onClick={handleSubmitClick}
                            className='w-full py-1 text-white rounded-xl mt-3 bg-teal-500 cursor-pointer'>
                            수정 하기
                        </button>
                    </section>
                    :
                    type === 'weight' ?
                    <section className="flex flex-col justify-center">
                        <input type="number"
                            placeholder={`${recentWeight}`}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="text-right" />
                        <button 
                            onClick={handleSubmitClick}
                            className='w-full py-1 text-white rounded-xl mt-3 bg-teal-500 cursor-pointer'>
                            수정 하기
                        </button>
                    </section>
                    : 
                    <section>
                        {activities.map(a => (
                            <button 
                                key={a.name}
                                className={`bg-stone-50 w-full text-start 
                                    rounded-xl border border-gray-300 px-3 py-2 mb-2 
                                    ${activity === a.label && 'border-teal-500 bg-teal-50'}
                                    `}
                                    onClick={() => setActivity(a.label)}
                                >
                                {a.name}
                            </button>
                        ))}
                       
                        <button 
                            onClick={handleSubmitClick}
                            className='w-full py-1 text-white rounded-xl mt-3 bg-teal-500 cursor-pointer'>
                            수정하기
                        </button>
                    </section>
                }
            </motion.div>
        </AnimatePresence>
    )
}