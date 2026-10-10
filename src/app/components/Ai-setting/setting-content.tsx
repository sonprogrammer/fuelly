'use client'

import { useState } from 'react'
import { ALLERGY_SUGGESTIONS, DISLIKED_FOOD_SUGGESTIONS, PREFERRED_FOOD_SUGGESTIONS } from '@/config/ai-preferences'

import { SubmitBtn } from '@/app/components/submit-button'
import { PreferenceChipEditor } from '@/app/components/Ai-setting/preference-chip'

type SettingStep =
    | 'allergies'
    | 'dislikedFoods'
    | 'preferredFoods'
    | 'customRequest'

interface SettingContentProps {
    step: SettingStep
}

export function SettingContent({ step }: SettingContentProps) {
    const [allergies, setAllergies] = useState<string[]>([])
    const [dislikedFoods, setDislikedFoods] = useState<string[]>([])
    const [preferredFoods, setPreferredFoods] = useState<string[]>([])
    const [customRequest, setCustomRequest] = useState('')

    if (step === 'allergies') {
        return (
            <>
                <PreferenceChipEditor
                    description="알레르기가 있거나 반드시 피해야 하는 음식이나 재료를 알려주세요."
                    suggestions={ALLERGY_SUGGESTIONS}
                    values={allergies}
                    onChange={setAllergies}
                    placeholder="예: 복숭아"
                />

                <p className="mt-4 rounded-xl bg-amber-500/10 px-3 py-3 text-xs leading-relaxed text-amber-300">
                    AI는 입력한 알레르기 정보를 추천 시 참고합니다. 실제 섭취 전 제품의 원재료와 알레르기 정보를 직접 확인해주세요.
                </p>

                <SubmitBtn isDisabled={false} submit={() => console.log('u')} isPending={false} />
            </>
        )
    }

    if (step === 'dislikedFoods') {
        return (
            <>
                <PreferenceChipEditor
                    description="선호하지 않거나 추천에서 되도록 제외하고 싶은 음식을 알려주세요."
                    suggestions={DISLIKED_FOOD_SUGGESTIONS}
                    values={dislikedFoods}
                    onChange={setDislikedFoods}
                    placeholder="예: 토마토"
                />

                <SubmitBtn isDisabled={false} submit={() => console.log('u')} isPending={false} />
            </>
        )
    }

    if (step === 'preferredFoods') {
        return (
            <>
                <PreferenceChipEditor
                    description="자주 먹고 싶거나 선호하는 음식과 식단 스타일을 알려주세요."
                    suggestions={PREFERRED_FOOD_SUGGESTIONS}
                    values={preferredFoods}
                    onChange={setPreferredFoods}
                    placeholder="예: 닭가슴살"
                />

                <SubmitBtn isDisabled={false} submit={() => console.log('u')} isPending={false} />
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
                    value={customRequest}
                    onChange={e => setCustomRequest(e.target.value)}
                    maxLength={200}
                    placeholder={`예: 야채를 많이 먹고 싶어요.\n조리시간은 15분 이내였으면 좋겠어요.`}
                    className="min-h-36 w-full resize-none rounded-xl border border-gray-800 bg-gray-900 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
                />

                <div className="mt-2 flex justify-end">
                    <span className="text-xs text-gray-600">
                        {customRequest.length} / 200
                    </span>
                </div>
            </div>

            <SubmitBtn submit={() => console.log('u')} isPending={false} isDisabled={!customRequest.trim()} />
        </>
    )
}

