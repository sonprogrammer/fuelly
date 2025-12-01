'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react';
import AiRecommandMenu from './AiRecommandMenu'

export default function AiMenu() {
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div>

            <div className="bg-white p-5 rounded-md border border-gray-300 flex flex-col gap-3">
                <section>
                    <section className="flex gap-2 items-center">
                        <img src="/영양.png" alt="icon" className="w-6" />
                        <h1 className="font-bold">AI 맞춤 식단 추천</h1>
                    </section>
                    <p className='text-gray-500'>남은 영양 목표에 맞춰 최적의 식사를 추천해드립니다</p>
                </section>

                <section className="flex bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg mb-4">
                    <section className="flex-1">
                        <h2 className="text-gray-700 font-semibold">남은 칼로리</h2>
                        <h2 className="text-blue-600">~~~ kcal</h2>
                    </section>
                    <section className='flex-1'>
                        <h2 className="text-gray-700 font-semibold">남은 단백질</h2>
                        <h2 className="text-green-600">~~~ g</h2>
                    </section>
                </section>
                <button className='flex gap-2 items-center bg-black text-white p-3 w-full justify-center rounded-lg hover:bg-black/80'>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {loading ? 'AI가 분석 중...' : 'AI 추천 받기'}</button>

{/* TODO 값이 들어왔을 때로 바꿔주기  */}
            <section className='ai추천메뉴 mt-5'>
                <AiRecommandMenu />
            </section>
                <h2 className="text-gray-400 text-sm">*본 서비스의 영양 정보는 AI 분석 결과로, 실제 값과 차이가 있을 수 있습니다.</h2>
            </div>
        </div>
    )
}