'use client'

import { SettingContent } from '@/app/components/Ai-setting/setting-content'
import { AlertTriangle, ChevronLeft, ChevronRight, Heart, MessageSquareText, UtensilsCrossed, X } from 'lucide-react'
import { useState } from 'react'

type SettingStep =
  | 'menu'
  | 'allergies'
  | 'dislikedFoods'
  | 'preferredFoods'
  | 'customRequest'

interface MyAiSettingModalProps {
  onClose: () => void
}

const settingItems = [
  {
    key: 'allergies',
    label: '알레르기',
    description: '피해야 하는 음식이나 재료를 등록해요.',
    icon: AlertTriangle,
    iconClassName: 'text-amber-400'
  },
  {
    key: 'dislikedFoods',
    label: '먹지 않는 음식',
    description: '선호하지 않거나 피하고 싶은 음식을 등록해요.',
    icon: UtensilsCrossed,
    iconClassName: 'text-red-400'
  },
  {
    key: 'preferredFoods',
    label: '선호 음식',
    description: 'AI가 추천할 때 우선 참고할 취향이에요.',
    icon: Heart,
    iconClassName: 'text-pink-400'
  },
  {
    key: 'customRequest',
    label: '추가 요청사항',
    description: 'AI에게 따로 알려주고 싶은 내용을 작성해요.',
    icon: MessageSquareText,
    iconClassName: 'text-blue-400'
  }
] as const

export function MyAiSettingModal({ onClose }: MyAiSettingModalProps) {
  const [step, setStep] = useState<SettingStep>('menu')

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
          <div className="flex items-center gap-2">
            {step !== 'menu' && (
              <button
                type="button"
                onClick={() => setStep('menu')}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-900 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-semibold text-white">
                {step === 'menu' ? 'AI 맞춤 설정' : getStepTitle(step)}
              </h2>
              {step === 'menu' && (
                <p className="mt-1 text-xs text-gray-500">
                  AI가 음식 추천 시 참고할 정보를 관리해요.
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-900 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {step === 'menu' && (
            <div className="space-y-2">
              {settingItems.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setStep(item.key)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-4 text-left transition hover:border-gray-700 hover:bg-gray-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-800">
                        <Icon className={`h-5 w-5 ${item.iconClassName}`} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
                  </button>
                )
              })}
            </div>
          )}

          {step !== 'menu' && (
            <SettingContent step={step} />
          )}
        </div>
      </div>
    </div>
  )
}


function getStepTitle(step: SettingStep) {
  if (step === 'allergies') return '알레르기'
  if (step === 'dislikedFoods') return '먹지 않는 음식'
  if (step === 'preferredFoods') return '선호 음식'
  if (step === 'customRequest') return '추가 요청사항'
  return 'AI 맞춤 설정'
}