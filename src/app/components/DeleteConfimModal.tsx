'use client'

import { Food } from '@/types/food'
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Trash2 } from 'lucide-react';

interface DeleteConfimModalProps {
    food: Food;
    open: boolean;
    onClose: () => void
    onConfirm: (food: Food) => void
    deleting: boolean
}


export function DeleteConfimModal({ food, open, onClose, onConfirm, deleting }: DeleteConfimModalProps) {

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }
    
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
                    className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl w-full max-w-[360px]"
                >
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-red-500/10 rounded-full">
                            <Trash2 className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <h2 className="text-base font-semibold text-white mb-1">음식 삭제</h2>
                        <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-300">{`"${food.name}"`}</span>을(를) 삭제할까요?
                        </p>
                        <p className="text-xs text-gray-600 mt-1">이 작업은 되돌릴 수 없습니다.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 text-sm font-medium text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all cursor-pointer"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => onConfirm(food)}
                            disabled={deleting}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-400 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    삭제 중...
                                </>
                            ) : '삭제하기'}
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
    )
}