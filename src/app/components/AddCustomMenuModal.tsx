"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState} from 'react'
import {Food} from '@/types/food'
import { toast } from 'react-hot-toast'
interface ModalProps {
    open: boolean,
    onClose: () => void
    handleSaveNomal: (food:Food) => void
    addNomalFoodPending: boolean
    handleSaveDaily: (food: Food) => void
    dailyPending: boolean
}

export default function AddCustomMenuModal({ open, onClose, handleSaveDaily,dailyPending, handleSaveNomal, addNomalFoodPending }: ModalProps) {

    const [foodName, setFoodName] = useState<string>('')
    const [calorie, setCalorie] = useState<string>('')
    const [protein, setProtein] = useState<string>('')
    const [unit, setUnit] = useState<string>('')


    if (!open) return null;

    
    const handleNomalFoodSubmit = () => {
        if(!foodName || !calorie || !protein || !unit) {
            toast.error('작성 내용을 확인해주세요')
            return
        }

        handleSaveNomal(
            {
              name: foodName,
              calorie: Number(calorie),
              protein: Number(protein),
              unit,
            }
          )
    }

    const handleDailyFoodSubmit = () => {
        if(!foodName || !calorie || !protein || !unit) {
            toast.error('작성 내용을 확인해주세요')
            return
        }
        handleSaveDaily(
            {
              name: foodName,
              calorie: Number(calorie),
              protein: Number(protein),
              unit,
            },
            
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
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">

<motion.div
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative flex flex-col bg-white rounded-2xl p-6 shadow-2xl w-full max-w-[450px]"
                    >
                       
                        <button
                            className="absolute right-4 top-4 text-gray-400 hover:text-black transition-colors"
                            onClick={onClose}
                        >
                            x
                        </button>

                        <div className="mb-6">
                            <h1 className="text-xl font-bold text-center text-gray-800">직접 입력하기</h1>
                            <p className="text-sm text-gray-500 text-center mt-1">식단에 추가할 음식 정보를 입력하세요</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold ml-1 mb-1 block">음식 이름</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                                    type="text" placeholder='예: 닭가슴살 샐러드'
                                    value={foodName}
                                    onChange={(e) => setFoodName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-semibold ml-1 mb-1 block text-orange-600">칼로리 (kcal)</label>
                                    <input
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                        type="number" placeholder='0'
                                        value={calorie}
                                        onChange={(e) => setCalorie(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold ml-1 mb-1 block text-blue-600">단백질 (g)</label>
                                    <input
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        type="number" placeholder='0'
                                        value={protein}
                                        onChange={(e) => setProtein(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold ml-1 mb-1 block">제공량</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                                    type="text" placeholder='예: 100g 또는 1개'
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3">
                            <button
                                onClick={handleDailyFoodSubmit}
                                disabled={dailyPending}
                                className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition-all shadow-md"
                            >
                                {dailyPending ? '추가 중...' : '오늘 식단에 바로 추가'}
                            </button>
                            <button
                                onClick={handleNomalFoodSubmit}
                                disabled={addNomalFoodPending}
                                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                            >
                                {addNomalFoodPending ? '저장 중...' : '자주 먹는 음식으로 저장'}
                            </button>
                        </div>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )
}