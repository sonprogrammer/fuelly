'use client'


import { MyAiSettingModal } from '@/app/components/Ai-setting/Ai-setting-modal'
import { AlertTriangle, ChevronRight, Heart, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function MyAiSetting() {
    const [open, setOpen] = useState(false)
    return (
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                    <Image src='/fuellyRun.png' width={40} height={40} alt='로고' />

                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            내 AI 영양관리자가 알아야 할 내용
                        </h2>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            음식 취향과 주의사항을 알려주시면 AI가 추천할 때 참고해요.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span className="text-xs font-medium text-gray-400">알레르기</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-300">
                        없음
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                    <div className="flex items-center gap-2">
                        <UtensilsCrossed className="h-4 w-4 text-red-400" />
                        <span className="text-xs font-medium text-gray-400">먹지 않는 음식</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-300">
                        없음
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                    <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-400" />
                        <span className="text-xs font-medium text-gray-400">선호 음식</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-300">
                        없음
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-xl bg-gray-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
                <span>AI 맞춤 설정 관리</span>
                <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>

            <p className="mt-3 text-[11px] leading-relaxed text-gray-600">
                AI 추천은 입력한 정보를 기반으로 제공되는 참고용 정보입니다.
            </p>

            {open && (
                <MyAiSettingModal onClose={() => setOpen(false)} />
            )}
        </section>
    )
}