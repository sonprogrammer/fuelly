import { Sparkles, Calendar, Database, Star, Save } from 'lucide-react'

export default function SearchGuide() {
    return (

        <section className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-blue-600 bg-blue-50 self-start px-3 py-1 rounded-full">
                AI 분석 예시
            </p>
            <section className='px-4 text-gray-500'>
                <p>요청하신 메뉴의 총 칼로리와 주요 영양 성분 분석 결과입니다. 균형 잡힌 식단을 위해 단백질 섭취를 권장합니다.</p>
            </section>
            <section className="bg-gray-200/70 p-4 rounded-2xl shadow-md">
                <h4 className="font-bold text-gray-800">BBQ 황금올리브 치킨 1마리</h4>
                <p className="text-xs text-gray-500 mb-3">AI는 이렇게 답변해드려요:</p>

                <div className="space-y-2">
                    <div className="flex justify-between items-center gap-2 text-sm p-3 px-5 bg-white/60 rounded-lg">
                        <section className='space-y-2'>

                            <div className='flex items-center gap-2'>
                                <p className='font-bold text-md'>치킨 100g 기준</p>
                                <button className='p-1 border rounded-md bg-white cursor-pointer'>
                                    <Star 
                                        className='w-4 h-4' 
                                        // fill={isSaved ? "#FFD700" : "none"} 
                                        // color={isSaved ? "#FFD700" : "currentColor"}
                                    />
                                </button>
                            </div>
                            <p className="font-medium text-blue-500">253kcal | 단백질 19g</p>
                        </section>
                        <div className='flex gap-3'>
                            <button>
                                <Calendar />
                            </button>
                            <button>
                                <Save />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-sm p-3 px-5 bg-white/60 rounded-lg">
                        <section className='space-y-2'>
                            <div className='flex items-center gap-2'>
                                <p className='font-bold text-md'>콜라 245ml</p>
                                <button className='p-1 border rounded-md bg-white cursor-pointer'>
                                    <Star 
                                        className='w-4 h-4' 
                                        // fill={isSaved ? "#FFD700" : "none"} 
                                        // color={isSaved ? "#FFD700" : "currentColor"}
                                    />
                                </button>
                            </div>
                                <p className="font-medium text-blue-500">105kcal | 단백질 0g</p>
                        </section>
                        <div className='flex gap-3'>
                            <button>
                                <Calendar />
                            </button>
                            <button>
                                <Save />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-gray-400 mt-3">
                    * 위 데이터는 예시이며 AI 분석 결과는 실제와 차이가 있을 수 있습니다.
                </p>
            </section>
        </section>
    )
}