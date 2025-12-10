
import { motion } from "framer-motion";
interface ModalProps {
    title: string,
    content: string
}

export default function CheckModalComponent({ title, content }: ModalProps) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
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
                <h1>{title}</h1>
                <p>{content}</p>
            </motion.div>
        </div>
    )
}