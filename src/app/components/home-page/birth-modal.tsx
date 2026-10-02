'use client'

import { motion } from "framer-motion"
import { CalendarDays } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useUpdatedUserInfo from "@/hooks/useUpdateUserInfo"

interface BirthDateModalProps {
    onClose?: () => void
}

export default function BirthDateModal({ onClose }: BirthDateModalProps) {
    const [birthDate, setBirthDate] = useState('')
    const { mutate: updateMutate, isPending } = useUpdatedUserInfo()

    const formatBirthDate = (value: string) => {
        const numbers = value.replace(/\D/g, '').slice(0, 8)

        if (numbers.length <= 4) return numbers
        if (numbers.length <= 6) return `${numbers.slice(0, 4)}.${numbers.slice(4)}`
        return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6)}`
    }

    const handleBirthDateChange = (value: string) => {
        setBirthDate(formatBirthDate(value))
    }


    const handleSubmit = () => {
        const numbers = birthDate.replace(/\D/g, '')

        if (numbers.length !== 8) {
            toast.error('생년월일 8자리를 입력해주세요')
            return
        }
        const birthDateValue = birthDate.replace(/\./g, '-')

        updateMutate({ birthDate: birthDateValue }, {
            onSuccess: () => {
                toast.success('생년월일이 저장되었습니다!')
                onClose?.()
            }
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="w-full max-w-[400px] rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl"
            >
                <div className="mb-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                        <CalendarDays className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h2 className="text-lg font-bold text-white">생년월일을 알려주세요</h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        나이에 따라 하루 권장 칼로리가 달라져요. 생년월일을 기준으로 나이를 자동 계산할게요.
                    </p>
                </div>

                <div>
                    <label htmlFor="birthDate" className="mb-2 block text-xs font-medium text-gray-400">생년월일</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="생년월일"
                        value={birthDate}
                        onChange={(e) => handleBirthDateChange(e.target.value)}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-center text-lg font-semibold tracking-wider text-white outline-none transition focus:border-emerald-500"
                    />
                    <p className="mt-2 text-xs text-gray-500">생년월일 8자리를 입력해주세요.</p>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!birthDate || isPending}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
                >
                    {isPending ? '저장 중...' : '저장하기'}
                </button>
            </motion.div>
        </div>
    )
}