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
    name: string
    label: ActivityLevel
}

const goals: Goal[] = [
    { name: '벌그업(근육 증가)', label: 'bulk' },
    { name: '다이어트(체지방 감소)', label: 'diet' },
    { name: '유지', label: 'maintain' }
]

const activities: Activity[] = [
    { name: '거의 운동 안함', label: 'sedentary' },
    { name: '가벼운 운동(주 1~2회)', label: 'light' },
    { name: '보통 운동(주 3~5회)', label: 'moderate' },
    { name: '많이 운동(주 6회 이상)', label: 'active' },
]

export default function GoalModalComponent({ type, onClose, recentWeight }: ModalProps) {
    const [weight, setWeight] = useState<string>(String(recentWeight ?? ""))
    const [updatedGoal, setUpdatedGoal] = useState<GoalLabel | null>(null)
    const [activity, setActivity] = useState<ActivityLevel | null>(null)

    const { mutate: updateMutate } = useUpdatedUserInfo()



    const handleSubmitClick = () => {
        if (type === 'goal' && updatedGoal) {
            updateMutate(
                { goal: updatedGoal },
                {
                    onSuccess: () => {
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
                {
                    onSuccess: () => {
                        toast.success('체중 기록 완료!')
                        onClose()
                    }
                }
            )
        }

        if (type === 'activity' && activity) {
            updateMutate(
                { activity },
                {
                    onSuccess: () => {
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative flex flex-col bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl w-[calc(100vw-2rem)] max-w-[380px]"
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-white">
                        {type === 'weight' ? '체중 수정' : type === 'goal' ? '목표 수정' : '운동량 수정'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-300 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {type === 'goal' && (
                    <section className="flex flex-col gap-2">
                        {goals.map(g => (
                            <button
                                key={g.name}
                                onClick={() => setUpdatedGoal(g.label)}
                                className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all cursor-pointer
                                ${updatedGoal === g.label
                                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                                        : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {g.name}
                            </button>
                        ))}
                    </section>
                )}

                {type === 'weight' && (
                    <section className="flex flex-col gap-3">
                        <div className="relative">
                            <input
                                type="number"
                                placeholder={`${recentWeight}`}
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full px-4 py-2.5 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white text-right focus:outline-none focus:border-emerald-500 transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">kg</span>
                        </div>
                    </section>
                )}

                {type === 'activity' && (
                    <section className="flex flex-col gap-2">
                        {activities.map(a => (
                            <button
                                key={a.name}
                                onClick={() => setActivity(a.label)}
                                className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all cursor-pointer
                                ${activity === a.label
                                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                                        : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {a.name}
                            </button>
                        ))}
                    </section>
                )}

                <button
                    onClick={handleSubmitClick}
                    className="w-full mt-5 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-xl hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer"
                >
                    수정하기
                </button>
            </motion.div>
        </AnimatePresence>
    )
}