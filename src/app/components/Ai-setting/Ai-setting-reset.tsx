'use client'

import { RotateCcw } from 'lucide-react'
import { useDeleteAiPreference } from '@/hooks/useDeleteAiPreference'
import { useState } from 'react'
import { ConfirmModalComponent } from '@/app/components/ConfirmModalComponent'

interface AiSettingResetBtnProps{
    disabled: boolean
}

export function AiSettingResetBtn({disabled}: AiSettingResetBtnProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const { mutate: resetAiPreference, isPending } = useDeleteAiPreference()

    const handleClickResetBtn = () => {
        setModalOpen(true)
    }

    const handleReset = () => {
        
        resetAiPreference(undefined, {
            onSuccess: () => {
                setModalOpen(false)
                console.log('clicke')
            },
            onError: (error) => {
                console.log('error', error)
            }
        })
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClickResetBtn}
                disabled={isPending || disabled}
                className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed! disabled:opacity-50"
            >
                <RotateCcw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
                {isPending ? '초기화 중...' : 'AI 맞춤 설정 초기화'}
            </button>

            {modalOpen && (
                <ConfirmModalComponent
                    title="AI 맞춤 설정 초기화"
                    content="알레르기, 먹지 않는 음식, 선호 음식, 추가 요청사항을 모두 초기화할까요?"
                    onConfirm={handleReset}
                    onClose={() => setModalOpen(false)}
                    isPending={isPending}
                />
            )}
        </>
    )
}