
import { motion } from "framer-motion";
interface ModalProps {
    title: string,
    content: string
    onConfirm: () => void
    onClose: () => void
    isPending?: boolean
}

export function ConfirmModalComponent({ title, content, onConfirm, onClose, isPending }: ModalProps) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1]
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[90%] max-w-md rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-xl"
            >
                <h1 className="text-lg font-semibold text-white">
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {content}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 disabled:cursor-not-allowed"
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? '초기화 중...' : '초기화'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}