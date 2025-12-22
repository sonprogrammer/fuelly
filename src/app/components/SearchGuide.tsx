import {  Calendar,Heart, Database } from 'lucide-react'

export default function SearchGuide() {
    return (

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-sm w-fit font-semibold text-blue-600 bg-blue-50 self-start px-3 py-1 rounded-full">
                    AI 분석 예시
                </h2>
                <p className='mt-2 text-gray-700 leading-relaxed'>요청하신 메뉴의 총 칼로리와 주요 영양 성분 분석 결과입니다. 균형 잡힌 식단을 위해 단백질 섭취를 권장합니다.</p>
            </div>


            <section className="grid gap-4">

                <div>
                    <p className="text-sm text-gray-500 ">AI는 이렇게 답변해드려요:</p>
                    <h3 className="font-bold text-lg">BBQ 황금올리브 치킨 1마리</h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className='font-bold text-lg'>치킨 100g 기준</h3>
                        <p className="text-sm text-gray-500">253kcal | 단백질 19g</p>

                    </div>
                    <div className="flex gap-2">
                            <button
                                aria-label='좋아요 저장'
                                 className="flex flex-col items-center p-2 cursor-pointer hover:bg-pink-50 rounded-lg transition-colors group"
                            >
                                <Heart className="w-5 h-5 text-pink-500 group-hover:fill-pink-500" />
                                <span className="text-[10px] mt-1">저장하기</span>
                            </button>
                            <button
                                aria-label='식단추가'
                                className="flex flex-col items-center p-2 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Calendar className="w-5 h-5 text-blue-500" />
                                <span className="text-[10px] mt-1">식단추가</span>
                            </button>
                            <button
                                aria-label='일반음식 저장'
                                className="flex flex-col items-center p-2 cursor-pointer hover:bg-green-50 rounded-lg transition-colors"
                            >
                                <Database className="w-5 h-5 text-green-500" />
                                <span className="text-[10px] mt-1">음식저장</span>
                            </button>
                    </div>
                </div>

                <p className="text-[11px] text-gray-400 mt-3">
                    * 위 데이터는 예시이며 AI 분석 결과는 실제와 차이가 있을 수 있습니다.
                </p>
            </section>
        </section>
    )
}