'use client'

import { useState } from 'react'
import { ALLERGY_SUGGESTIONS, DISLIKED_FOOD_SUGGESTIONS, PREFERRED_FOOD_SUGGESTIONS } from '@/config/ai-preferences'

import { SubmitBtn } from '@/app/components/submit-button'
import { PreferenceChipEditor } from '@/app/components/Ai-setting/preference-chip'
import { AiPreference } from '@/types/ai'
import { useUpdateAiPreference } from '@/hooks/useUpdateAiPreference'
import { useUserStore } from '@/store/userStore'

type SettingStep =
    | 'allergies'
    | 'dislikedFoods'
    | 'preferredFoods'
    | 'customRequest'

interface SettingContentProps {
    step: SettingStep
    initialPreference: AiPreference
    onClose: () => void
}

export function SettingContent({ step, initialPreference, onClose }: SettingContentProps) {
    const user = useUserStore(state => state.user)
    const [preferences, setPreferences] = useState<AiPreference>({
        allergies: initialPreference?.allergies ?? [],
        dislikedFoods: initialPreference?.dislikedFoods ?? [],
        preferredFoods: initialPreference?.preferredFoods ?? [],
        customRequest: initialPreference?.customRequest ?? ''
    })

    const { mutate: updateAiPreference, isPending } = useUpdateAiPreference(user?._id)


    const handleSubmit = () => {
        if (step === 'allergies') {
            updateAiPreference({ allergies: preferences.allergies })
            onClose()
            return
        }

        if (step === 'dislikedFoods') {
            updateAiPreference({ dislikedFoods: preferences.dislikedFoods })
            onClose()
            return
        }

        if (step === 'preferredFoods') {
            updateAiPreference({ preferredFoods: preferences.preferredFoods })
            onClose()
            return
        }

        updateAiPreference({ customRequest: preferences.customRequest.trim() })
        onClose()
    }

    const isDisabled =
        isPending ||
        (step === 'allergies' &&
            JSON.stringify(preferences.allergies) === JSON.stringify(initialPreference.allergies)) ||
        (step === 'dislikedFoods' &&
            JSON.stringify(preferences.dislikedFoods) === JSON.stringify(initialPreference.dislikedFoods)) ||
        (step === 'preferredFoods' &&
            JSON.stringify(preferences.preferredFoods) === JSON.stringify(initialPreference.preferredFoods)) ||
        (step === 'customRequest' &&
            preferences.customRequest.trim() === initialPreference.customRequest.trim())
    if (step === 'allergies') {
        return (
            <>
                <PreferenceChipEditor
                    description="알레르기가 있거나 반드시 피해야 하는 음식이나 재료를 알려주세요."
                    suggestions={ALLERGY_SUGGESTIONS}
                    values={preferences.allergies}
                    onChange={(allergies) => {
                        setPreferences(prev => ({
                            ...prev,
                            allergies
                        }))
                    }}
                    placeholder="예: 복숭아"
                />

                <p className="mt-4 rounded-xl bg-amber-500/10 px-3 py-3 text-xs leading-relaxed text-amber-300">
                    AI는 입력한 알레르기 정보를 추천 시 참고합니다. 실제 섭취 전 제품의 원재료와 알레르기 정보를 직접 확인해주세요.
                </p>

                <SubmitBtn  isDisabled={isDisabled} submit={handleSubmit} isPending={false} />
            </>
        )
    }

    if (step === 'dislikedFoods') {
        return (
            <>
                <PreferenceChipEditor
                    description="선호하지 않거나 추천에서 되도록 제외하고 싶은 음식을 알려주세요."
                    suggestions={DISLIKED_FOOD_SUGGESTIONS}
                    values={preferences.dislikedFoods}
                    onChange={(dislikedFoods) => {
                        setPreferences(prev => ({
                            ...prev,
                            dislikedFoods
                        }))
                    }}
                    placeholder="예: 토마토"
                />

                <SubmitBtn  isDisabled={isDisabled} submit={handleSubmit} isPending={false} />
            </>
        )
    }

    if (step === 'preferredFoods') {
        return (
            <>
                <PreferenceChipEditor
                    description="자주 먹고 싶거나 선호하는 음식과 식단 스타일을 알려주세요."
                    suggestions={PREFERRED_FOOD_SUGGESTIONS}
                    values={preferences.preferredFoods}
                    onChange={(preferredFoods) => {
                        setPreferences(prev => ({
                            ...prev,
                            preferredFoods
                        }))
                    }}
                    placeholder="예: 닭가슴살"
                />

                <SubmitBtn  isDisabled={isDisabled} submit={handleSubmit} isPending={false} />
            </>
        )
    }

    return (
        <>
            <p className="text-sm leading-relaxed text-gray-400">
                AI에게 추천할 때 추가로 참고했으면 하는 내용을 자유롭게 작성해주세요.
            </p>

            <div className="mt-5">
                <textarea
                    value={preferences.customRequest}
                    onChange={e => {
                        setPreferences(prev => ({
                            ...prev,
                            customRequest: e.target.value
                        }))
                    }}
                    maxLength={200}
                    placeholder={`예: 야채를 많이 먹고 싶어요.`}
                    className="min-h-36 w-full resize-none rounded-xl border border-gray-800 bg-gray-900 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
                />

                <div className="mt-2 flex justify-end">
                    <span className="text-xs text-gray-600">
                        {preferences.customRequest.length} / 200
                    </span>
                </div>
            </div>

            <SubmitBtn submit={handleSubmit} isPending={false}  isDisabled={isDisabled} />
        </>
    )
}

