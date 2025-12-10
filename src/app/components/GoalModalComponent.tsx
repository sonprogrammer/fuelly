'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'

interface ModalProps {
    type: string | null
    onClose: () => void
    recentGoal?: string
    recentWeight?: number
}
type GoalLabel = 'bulk' | 'diet' | 'maintain'
interface Goal {
    name: string;
    label: GoalLabel
}

export default function GoalModalComponent({ type, onClose, recentGoal, recentWeight }: ModalProps) {
    const [weight, setWeight] = useState<string>(String(recentWeight ?? ""))
    const [updatedGoal, setUpdatedGoal] = useState<GoalLabel | null>(null)
    
    const goals: Goal[] = [
        { name: '벌그업(근육 증가)', label: 'bulk' },
        { name: '다이어트(체지방 감소)', label: 'diet' },
        { name: '유지', label: 'maintain' }
    ]

    

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
                className="relative flex flex-col bg-white rounded-xl p-5 shadow-xl sm:w-[90%] md:w-[80%] lg:w-[60%]"
            >
                <button
                    onClick={onClose}
                    className='absolute top-3 right-3 w-6 h-6  bg-black text-white rounded-full cursor-pointer'
                >X</button>
                <h1 className='text-center mb-3 font-bold'>
                    {type === 'weight' ? '체중 수정' : '목표 수정'}
                </h1>
                {type === 'goal' ?
                    <section>
                        {goals.map(g => (
                            <button
                                key={g.name}
                                className={`bg-stone-50 w-full text-start 
                                rounded-xl border border-gray-300 px-3 py-2 mb-2 `}
                                onClick={() => setUpdatedGoal(g.label)}
                            >
                                {g.name}
                            </button>
                        ))}
                        {/* TODO 데이터 업데이트 서버로 요청 보내기 */}
                        <button className='w-full py-1 text-white rounded-xl mt-3 bg-teal-500'>
                            수정 하기
                        </button>
                    </section>
                    :
                    <section>
                        <input type="number"
                            placeholder={`${recentWeight}`}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="text-right" />
                            {/* TODO 데이터 업데이트 서버로 요청 보내기 */}
                        <button className='w-full py-1 text-white rounded-xl mt-3 bg-teal-500 cursor-pointer'>
                            수정 하기
                        </button>
                    </section>
                }
            </motion.div>
        </AnimatePresence>
    )
}