'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useUpdatedUserInfo from "@/hooks/useUpdateUserInfo"

interface ModalProps {
    type: 'weight' | 'goal' | 'activity' | null
    onClose: () => void
    recentGoal?: string
    recentWeight?: number
    recentAtivity?: string
}

type GoalLabel = 'bulk' | 'diet' | 'maintain'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active'

interface Goal {
    name: string
    description: string
    label: GoalLabel
}

interface Activity {
    name: string
    description: string
    label: ActivityLevel
}

const goals: Goal[] = [
    {
        name: '근육 증가',
        description: '충분한 영양과 단백질 섭취를 관리해요',
        label: 'bulk'
    },
    {
        name: '체지방 감소',
        description: '섭취량을 조절하며 건강하게 감량해요',
        label: 'diet'
    },
    {
        name: '현재 상태 유지',
        description: '균형 잡힌 식단으로 현재 상태를 유지해요',
        label: 'maintain'
    }
]

const activities: Activity[] = [
    {
        name: '거의 운동하지 않아요',
        description: '주로 앉아서 생활해요',
        label: 'sedentary'
    },
    {
        name: '가볍게 운동해요',
        description: '주 1~2회 정도 운동해요',
        label: 'light'
    },
    {
        name: '꾸준히 운동해요',
        description: '주 3~5회 정도 운동해요',
        label: 'moderate'
    },
    {
        name: '매우 활동적이에요',
        description: '주 6회 이상 운동해요',
        label: 'active'
    }
]

export default function GoalModalComponent({ type, onClose, recentGoal, recentWeight, recentAtivity }: ModalProps) {
    const [weight, setWeight] = useState(String(recentWeight ?? ""))
    const [updatedGoal, setUpdatedGoal] = useState<GoalLabel | null>((recentGoal as GoalLabel) ?? null)
    const [activity, setActivity] = useState<ActivityLevel | null>((recentAtivity as ActivityLevel) ?? null)
    const { mutate: updateMutate, isPending } = useUpdatedUserInfo()

    const isDisabled = isPending ||
        (type === 'goal' && (!updatedGoal || updatedGoal === recentGoal)) ||
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

    const title = type === 'weight' ? '현재 체중 수정' : type === 'goal' ? '목표 수정' : '활동량 수정'

    const description = type === 'weight' ? '변경된 체중을 기준으로 영양 목표를 다시 계산해요.' : type === 'goal' ? '새로운 목표에 맞춰 하루 권장 섭취량을 조정해요.' : '평소 활동량에 따라 필요한 에너지량이 달라져요.'

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="relative w-[calc(100vw-2rem)] max-w-[400px] rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl"
            >
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                        <p className="mt-1.5 max-w-[300px] text-xs leading-relaxed text-gray-500">{description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="닫기"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-800 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {type === 'goal' && (
                    <section className="flex flex-col gap-3">
                        {goals.map((goal) => {
                            const selected = updatedGoal === goal.label
                            return (
                                <button
                                    key={goal.label}
                                    type="button"
                                    onClick={() => setUpdatedGoal(goal.label)}
                                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${selected
                                            ? 'border-emerald-500 bg-emerald-500/10'
                                            : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                                        }`}
                                >
                                    <div>
                                        <p className={`text-sm font-semibold ${selected ? 'text-emerald-400' : 'text-white'}`}>{goal.name}</p>
                                        <p className="mt-1 text-xs text-gray-500">{goal.description}</p>
                                    </div>
                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'
                                        }`}>
                                        {selected && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                </button>
                            )
                        })}
                    </section>
                )}

                {type === 'weight' && (
                    <section className="py-4">
                        <div className="relative">
                            <input
                                type="number"
                                inputMode="decimal"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full border-b-2 border-gray-700 bg-transparent px-3 py-5 pr-16 text-center text-4xl font-bold text-white outline-none transition focus:border-emerald-500"
                                autoFocus
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">kg</span>
                        </div>
                        {recentWeight && (
                            <p className="mt-3 text-center text-xs text-gray-600">현재 체중 {recentWeight}kg</p>
                        )}
                    </section>
                )}

                {type === 'activity' && (
                    <section className="flex flex-col gap-3">
                        {activities.map((item) => {
                            const selected = activity === item.label
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => setActivity(item.label)}
                                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${selected
                                            ? 'border-emerald-500 bg-emerald-500/10'
                                            : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                                        }`}
                                >
                                    <div>
                                        <p className={`text-sm font-semibold ${selected ? 'text-emerald-400' : 'text-white'}`}>{item.name}</p>
                                        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                                    </div>
                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'
                                        }`}>
                                        {selected && <Check className="h-3 w-3 text-white" />}
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
                    className="mt-6 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
                >
                    {isPending ? '저장 중...' : '변경사항 저장'}
                </button>
            </motion.div>
        </AnimatePresence>
    )
}