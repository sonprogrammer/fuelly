'use client'

import { ChevronLeft, ChevronRight, Dumbbell, Ruler, Scale, Target, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EditModalProps, EditType } from '@/app/components/goal/types'
import { activityMap, goalMap } from '@/app/components/goal/goalEditItems'
import GoalModalComponent from '@/app/components/goal/GoalModalComponent'



export function GoalEditModal({ onClose, recentGoal, recentHeight, recentWeight, recentActivity }: EditModalProps) {
    const [editStep, setEditStep] = useState<EditType | null>(null)

    const items = [
        {
            key: 'goal',
            label: '목표',
            value: recentGoal ? goalMap[recentGoal] : '설정 필요',
            icon: Target
        },
        {
            key: 'height',
            label: '키',
            value: recentHeight ? `${recentHeight}cm` : '설정 필요',
            icon: Ruler
        },
        {
            key: 'weight',
            label: '체중',
            value: recentWeight ? `${recentWeight}kg` : '설정 필요',
            icon: Scale
        },
        {
            key: 'activity',
            label: '활동량',
            value: recentActivity ? activityMap[recentActivity] : '설정 필요',
            icon: Dumbbell
        }
    ] as const

    const title = items.find(i => i.key === editStep)?.label

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="w-[calc(100vw-2rem)] max-w-[400px] overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
                <div className="flex items-center gap-2">
                    {editStep && (
                        <button
                            type="button"
                            onClick={() => setEditStep(null)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-900 hover:text-white"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    )}
                    <div>
                        <h2 className="text-base font-semibold text-white">
                            {!editStep ? '내 정보 수정' : `${title} 수정`}
                        </h2>
                        {editStep === null && (
                            <p className="mt-0.5 text-xs text-gray-500">
                                수정할 항목을 선택해주세요.
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-900 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={editStep ?? null}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.15 }}
                    className="p-5"
                >
                    {!editStep ? (
                        <div className="space-y-2">
                            {items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() => setEditStep(item.key)}
                                        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-4 text-left transition hover:bg-gray-900"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800">
                                                <Icon className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">{item.label}</p>
                                                <p className="mt-0.5 text-sm font-semibold text-white">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-gray-600" />
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <GoalModalComponent
                            type={editStep}
                            recentGoal={recentGoal}
                            recentHeight={recentHeight}
                            recentWeight={recentWeight}
                            recentAtivity={recentActivity}
                            onClose={() => setEditStep(null)}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}

