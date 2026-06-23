"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'
import { Food } from '@/types/food'
import { toast } from 'react-hot-toast'
import { usePostAiFoodInfo } from "@/hooks/usePostAiFoodInfo";
interface ModalProps {
    open: boolean,
    onClose: () => void
    handleSaveNomal: (food: Food) => void
    addNomalFoodPending: boolean
    handleSaveDaily: (food: Food) => void
    dailyPending: boolean
}

export default function AddCustomMenuModal({ open, onClose, handleSaveDaily, dailyPending, handleSaveNomal, addNomalFoodPending }: ModalProps) {

    const [foodName, setFoodName] = useState<string>('')
    const [calorie, setCalorie] = useState<string>('')
    const [protein, setProtein] = useState<string>('')
    const [unit, setUnit] = useState<string>('')

    const { mutate: foodAiInfo, isPending } = usePostAiFoodInfo()


    if (!open) return null;


    const handleNomalFoodSubmit = () => {
        if (!foodName || !calorie || !protein || !unit) {
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

    // * ai가 자동으로 채워넣기
    const handleAiAutoFill = () => {
        console.log('hdafds')
        if(!foodName.trim()) {
            toast.dismiss()
            toast.error('음식명을 입력하고 요청해주세요')
            return
        }
        foodAiInfo(foodName.trim(), {
            onSuccess: (data) => {
                setCalorie(data.calorie.toString())
                setProtein(data.protein.toString())
                setUnit(data.unit || '')
                toast.success('AI 영양 정보 불러오기 성공')
            }
        })
    }

    const handleDailyFoodSubmit = () => {
        if (!foodName || !calorie || !protein || !unit) {
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
                    className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative flex flex-col bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl w-full max-w-[420px]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-base font-semibold text-white">직접 입력하기</h2>
                                <p className="text-xs text-gray-600 mt-0.5">음식 정보를 입력하세요</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1.5 flex justify-between items-center">
                                    <span>음식 이름</span>
                                    <button
                                        type="button" 
                                        onClick={handleAiAutoFill}
                                        disabled={isPending}
                                        className="text-emerald-400 hover:text-emerald-300 transition-colors text-[10px] font-bold cursor-pointer"
                                    >
                                        {isPending ? '✨ 분석 중...' : '✨ AI 자동 채우기'}
                                    </button>
                                </label>
                                <input
                                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 transition-all"
                                    type="text"
                                    placeholder="예: 닭가슴살 샐러드"
                                    value={foodName}
                                    onChange={(e) => setFoodName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-orange-400 mb-1.5 block">칼로리 (kcal)</label>
                                    <input
                                        className="w-full bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-all"
                                        type="number"
                                        placeholder="0"
                                        value={calorie}
                                        onChange={(e) => setCalorie(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-emerald-400 mb-1.5 block">단백질 (g)</label>
                                    <input
                                        className="w-full bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 transition-all"
                                        type="number"
                                        placeholder="0"
                                        value={protein}
                                        onChange={(e) => setProtein(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1.5 block">제공량</label>
                                <input
                                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 transition-all"
                                    type="text"
                                    placeholder="예: 100g 또는 1개"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <button
                                onClick={handleDailyFoodSubmit}
                                disabled={dailyPending}
                                className="w-full bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {dailyPending ? '추가 중...' : '오늘 식단에 바로 추가'}
                            </button>
                            <button
                                onClick={handleNomalFoodSubmit}
                                disabled={addNomalFoodPending}
                                className="w-full border border-gray-700 text-gray-400 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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