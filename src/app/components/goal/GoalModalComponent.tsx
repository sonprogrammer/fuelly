'use client'

import { Check} from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useUpdatedUserInfo from "@/hooks/useUpdateUserInfo"
import { ActivityLevel, GoalLabel } from "@/types/goal"
import { ACTIVITIES, GOALS } from "@/config/survey-goals"
import { SubmitBtn } from "@/app/components/submit-button"

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


    return (
        <>

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

            <SubmitBtn 
                submit={handleSubmitClick}
                isDisabled={isDisabled}
                isPending={isPending}
            />
        </>
    )

}