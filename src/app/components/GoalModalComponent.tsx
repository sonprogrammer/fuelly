'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useUpdatedUserInfo from "@/hooks/useUpdateUserInfo"
import { ActivityLevel, GoalLabel } from "@/types/goal"
import { ACTIVITIES, GOALS } from "@/config/survey-goals"

interface ModalProps {
    type: 'height' | 'weight' | 'goal' | 'activity' | null
    onClose: () => void
    recentGoal?: string
    recentHeight?: number
    recentWeight?: number
    recentAtivity?: string
}


export default function GoalModalComponent({ type, onClose, recentGoal, recentWeight, recentAtivity, recentHeight }: ModalProps) {
    const [weight, setWeight] = useState(String(recentWeight ?? ""))
    const [height, setHeight] = useState(String(recentHeight ?? ""))
    const [updatedGoal, setUpdatedGoal] = useState<GoalLabel | null>((recentGoal as GoalLabel) ?? null)
    const [activity, setActivity] = useState<ActivityLevel | null>((recentAtivity as ActivityLevel) ?? null)
    const { mutate: updateMutate, isPending } = useUpdatedUserInfo()

    const isDisabled = isPending ||
        (type === 'goal' && (!updatedGoal || updatedGoal === recentGoal)) ||
        (type === 'height' && (!height || Number(height) === recentHeight)) ||
        (type === 'weight' && (!weight || Number(weight) === recentWeight)) ||
        (type === 'activity' && (!activity || activity === recentAtivity))

    const handleSubmitClick = () => {
        if (type === 'goal' && updatedGoal) {
            updateMutate({ goal: updatedGoal }, {
                onSuccess: () => {
                    toast.success('목표가 수정되었습니다!')
                    onClose()
                }
            })
            return
        }

        if (type === 'height' && height) {
            updateMutate({ height: Number(height) }, {
                onSuccess: () => {
                    toast.success('키가 수정되었습니다!')
                    onClose()
                }
            })
        }

        if (type === 'weight' && weight) {
            updateMutate({ weight: Number(weight) }, {
                onSuccess: () => {
                    toast.success('체중이 수정되었습니다!')
                    onClose()
                }
            })
            return
        }

        if (type === 'activity' && activity) {
            updateMutate({ activity }, {
                onSuccess: () => {
                    toast.success('활동량이 수정되었습니다!')
                    onClose()
                }
            })
        }
    }

    const title = type === 'weight' ? '현재 체중 수정' : type === 'goal' ? '목표 수정' : type === 'height' ? '신장 수정': '활동량 수정'

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-white">{title}</h2>
                    <button type="button" onClick={onClose} aria-label="닫기" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {type === 'goal' && (
                    <section className="flex flex-col gap-2">
                        {GOALS.map((goal) => {
                            const selected = updatedGoal === goal.label

                            return (
                                <button
                                    key={goal.label}
                                    type="button"
                                    onClick={() => setUpdatedGoal(goal.label)}
                                    className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-left transition ${selected ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800'}`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className={`text-sm font-semibold ${selected ? 'text-emerald-400' : 'text-white'}`}>
                                                {goal.label === 'bulk' && '근육 증가'}
                                                {goal.label === 'diet' && '체지방 감소'}
                                                {goal.label === 'maintain' && '유지'}
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed text-gray-500">{goal.description}</p>
                                        </div>

                                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'}`}>
                                            {selected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </section>
                )}

                {type === 'height' && (
                    <section className="py-5">
                        <div className="flex items-end justify-center gap-2">
                            <input
                                type="number"
                                inputMode="decimal"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-36 border-b border-gray-700 bg-transparent pb-2 text-center text-5xl font-bold text-white outline-none focus:border-emerald-500"
                                autoFocus
                            />
                            <span className="mb-2 text-sm text-gray-500">cm</span>
                        </div>
                    </section>
                )}

                {type === 'weight' && (
                    <section className="py-5">
                        <div className="flex items-end justify-center gap-2">
                            <input
                                type="number"
                                inputMode="decimal"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-36 border-b border-gray-700 bg-transparent pb-2 text-center text-5xl font-bold text-white outline-none focus:border-emerald-500"
                                autoFocus
                            />
                            <span className="mb-2 text-sm text-gray-500">kg</span>
                        </div>
                    </section>
                )}

                {type === 'activity' && (
                    <section className="flex flex-col gap-2">
                        {ACTIVITIES.map((item) => {
                            const selected = activity === item.label

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => setActivity(item.label)}
                                    className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-left transition ${selected ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800'}`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className={`text-sm font-semibold ${selected ? 'text-emerald-400' : 'text-white'}`}>{item.title}</p>
                                            <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.description}</p>
                                        </div>

                                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'}`}>
                                            {selected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </section>
                )}

                <button
                    type="button"
                    onClick={handleSubmitClick}
                    disabled={isDisabled}
                    className="mt-5 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
                >
                    {isPending ? '저장 중...' : '저장'}
                </button>
            </motion.div>
        </AnimatePresence>
    )

}