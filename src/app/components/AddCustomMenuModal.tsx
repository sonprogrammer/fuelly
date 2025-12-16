"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState} from 'react'
import usePostAddCustomFood from '@/hooks/usePostAddCustomFood'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
interface ModalProps {
    open: boolean,
    onClose: () => void
}

export default function AddCustomMenuModal({ open, onClose }: ModalProps) {

    const [foodName, setFoodName] = useState<string>('')
    const [calorie, setCalorie] = useState<string>('')
    const [protein, setProtein] = useState<string>('')
    const [unit, setUnit] = useState<string>('')

    
    const {mutate, isPending} = usePostAddCustomFood()
    const { mutate: dailyMutate, isPending: dailyPending} =usePostFoodToDailyMeal()
    if (!open) return null;

    
    const handleNomalFoodSubmit = () => {
        if(!foodName || !calorie || !protein || !unit) {
            alert('작성 내용을 확인해주세요')
            return
        }

        mutate(
            {
              name: foodName,
              calorie: Number(calorie),
              protein: Number(protein),
              unit,
            },
            {
              onSuccess: () => {
                onClose()
              },
            }
          )
    }

    const handleDailyFoodSubmit = () => {
        if(!foodName || !calorie || !protein || !unit) {
            alert('작성 내용을 확인해주세요')
            return
        }
        dailyMutate(
            {
              name: foodName,
              calorie: Number(calorie),
              protein: Number(protein),
              unit,
            },
            {
              onSuccess: () => {
                onClose()
              },
            }
          )
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <AnimatePresence>
            {open && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

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
                            className="absolute right-3 top-3 w-6 h-6  bg-black text-white rounded-full cursor-pointer"
                            onClick={onClose}
                        >
                            X
                        </button>
                        <h1 className="text-lg font-bold text-center">영양 정보를 직접 입력해주세요</h1>
                        <input
                            className="flex-1 bg-gray-100 p-2 rounded-xl w-full mb-3  mt-5"
                            type="text" placeholder='음식 이름' 
                            value={foodName}
                            onChange={(e)=> setFoodName(e.target.value)}
                            />
                        <section className="flex w-full gap-3">
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl '
                                type="number" placeholder='칼로리' 
                                value={calorie}
                                onChange={(e)=> setCalorie(e.target.value)}
                                />
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl'
                                type="number" placeholder='단백질(g)' 
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                />
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl'
                                type="text" placeholder='양 (예: 100g)'
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                 />
                        </section>

                        
                        <section className="mt-5 flex gap-2">
                            <button 
                            className={`flex-1 px-3 py-2 rounded-lg text-white
                                ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'}
                              `}
                                onClick={handleNomalFoodSubmit}
                            >
                                {isPending ? '저장 중...' : '일반 음식에 추가하기'}
                            </button>
                            <button 
                                onClick={handleDailyFoodSubmit}
                                className="flex-1 bg-blue-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-300"
                            >
                                {dailyPending ? '내보내는 중...' : '오늘 먹은 음식에 바로 추가하기'}
                            </button>
                        </section>


                        
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )
}