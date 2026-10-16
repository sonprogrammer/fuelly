'use client'


import { MyAiSettingModal } from '@/app/components/Ai-setting/Ai-setting-modal'
import { AiSettingResetBtn } from '@/app/components/Ai-setting/Ai-setting-reset'
import { useGetAiPreference } from '@/hooks/useGetAiPreference'
import { useUserStore } from '@/store/userStore'
import { AlertTriangle, ChevronRight, Heart, Loader2, RefreshCw, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function MyAiSetting() {
    const [open, setOpen] = useState(false)
    const user = useUserStore(state => state.user)

    const { data, isPending: isAIPreferencePending, refetch, isFetching, isError } = useGetAiPreference(user?._id)

    const aiPreference = data?.aiPreference
    const hasAiPreference = Boolean(aiPreference?.allergies.length ||
        aiPreference?.dislikedFoods.length ||
        aiPreference?.preferredFoods.length ||
        aiPreference?.customRequest.trim())

    return (
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0">
                        <Image
                            src="/fuelly-check.png"
                            width={40}
                            height={40}
                            alt="로고"
                            className="h-6 w-6 sm:h-10 sm:w-10 object-contain"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-white">
                            내 AI 영양관리자에게 알려주세요
                        </h2>

                    </div>
                </div>
                <AiSettingResetBtn disabled={!hasAiPreference} />
            </div>

            {
                isAIPreferencePending ? (
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                        {[1, 2, 3].map(item => (
                            <div
                                key={item}
                                className="animate-pulse rounded-xl border border-gray-800 bg-gray-950/50 p-3"
                            >
                                <div className="h-3 w-20 rounded bg-gray-800" />
                                <div className="mt-3 h-4 w-24 rounded bg-gray-800" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                        <p className="text-sm font-medium text-red-400">
                            AI 맞춤 설정을 불러오지 못했습니다.
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            잠시 후 다시 시도해주세요.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="mt-3 flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-300 transition hover:text-white disabled:cursor-not-allowed disabled:text-gray-600"
                        >
                            {isFetching ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <RefreshCw className="h-3.5 w-3.5" />
                            )}
                            {isFetching ? '다시 불러오는 중...' : '다시 시도'}
                        </button>
                    </div>
                ) : (
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-400" />
                                <span className="text-xs font-medium text-gray-400">알레르기</span>
                            </div>
                            <p className="mt-2 truncate text-sm font-semibold text-gray-300">
                                {aiPreference?.allergies?.length
                                    ? aiPreference.allergies.join(' · ')
                                    : '없음'}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                            <div className="flex items-center gap-2">
                                <UtensilsCrossed className="h-4 w-4 text-red-400" />
                                <span className="text-xs font-medium text-gray-400">먹지 않는 음식</span>
                            </div>
                            <p className="mt-2 truncate text-sm font-semibold text-gray-300">
                                {aiPreference?.dislikedFoods?.length
                                    ? aiPreference.dislikedFoods.join(' · ')
                                    : '없음'}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-800 bg-gray-950/50 p-3">
                            <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-pink-400" />
                                <span className="text-xs font-medium text-gray-400">선호 음식</span>
                            </div>
                            <p className="mt-2 truncate text-sm font-semibold text-gray-300">
                                {aiPreference?.preferredFoods?.length
                                    ? aiPreference.preferredFoods.join(' · ')
                                    : '없음'}
                            </p>
                        </div>
                    </div>
                )
            }

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

            {
                open && aiPreference && (
                    <MyAiSettingModal onClose={() => setOpen(false)} initialPreference={aiPreference} />
                )
            }
        </section >
    )
}