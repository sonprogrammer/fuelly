"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    open: boolean,
    onClose: () => void
}

export default function AddCustomMenuModal({ open, onClose }: ModalProps) {
    if (!open) return null;

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
                            type="text" placeholder='음식 이름' />
                        <section className="flex w-full gap-3">
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl '
                                type="text" placeholder='칼로리' />
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl'
                                type="text" placeholder='단백질(g)' />
                            <input
                                className='flex-1 bg-gray-100 p-2 rounded-xl'
                                type="text" placeholder='양 (예: 100g)' />
                        </section>

                        {/*TODO 아이콘으로 해놓기  */}
                        <section className="mt-5 flex gap-2">
                            <button className='flex-1 bg-teal-500 px-3 py-2 rounded-lg cursor-pointer text-white hover:bg-teal-600'>일반 음식에 추가하기</button>
                            <button className="flex-1 bg-blue-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-300">오늘 먹은 음식에 바로 추가하기</button>
                        </section>


                        
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )
}