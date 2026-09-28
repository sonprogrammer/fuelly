'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackBtn() {
    const router = useRouter()

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-800 active:scale-[0.98]"
        >
            <ArrowLeft className="h-4 w-4" />
            돌아가기
        </button>
    )
}