'use client'

import { Pencil, Target } from "lucide-react"
import { useState } from "react"
import { EditType, GoalProps } from "@/app/components/goal/types"
import {  goalMap } from "@/app/components/goal/goalEditItems"
import { GoalEditModal } from "@/app/components/goal/goal-edit-modal"



export function GoalComponent({ goal, weight, activity, height }: GoalProps) {
    const [edit, setEdit] = useState<EditType | null>(null)

    const goalName = goal ? goalMap[goal] : "목표 설정 필요"


    return (
        <>
            <div className="min-w-[290px] overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">
                
                <div className="flex items-start justify-between p-5">
                    
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                            <Target className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">현재 목표</p>
                            <p className="mt-1 text-lg font-bold text-white">{goalName}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setEdit('goal')}
                        aria-label="목표 수정"
                        className="flex justify-center items-center h-8 w-8 cursor-pointer rounded-full text-gray-500 transition hover:bg-emerald-500/10 hover:text-white"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                </div>

                
            </div>

            {edit && (
                <div
                    onClick={() => setEdit(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <GoalEditModal
                            recentGoal={goal}
                            recentHeight={height}
                            recentWeight={weight}
                            recentActivity={activity}
                            onClose={() => setEdit(null)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}