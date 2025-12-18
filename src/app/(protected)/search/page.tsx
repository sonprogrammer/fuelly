'use client'

import { useState } from 'react'
import { Sparkles, Calendar, Database, Heart } from 'lucide-react'
import { Food } from '@/types/food'
import SearchGuide from '@/app/components/SearchGuide'
interface AiResponse {
    description: string;
    foods: Food[]
}


export default function AISearchPage() {
    const [inputValue, setInputValue] = useState<string>('')
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
    const [result, setResult] = useState<AiResponse | null>(null)

    const handleSearch = () => {
        if (!inputValue.trim()) return

    }

    // !여기서 받는 타입에 따라 오늘 식단이나 일반 음식에 저장하기
    const handleSaveToDaily = (type: string, food: Food) => {

    }


    return (
        <div className="relative h-full overflow-hidden">



            <div className="bg-gradient-animated absolute inset-0 z-0" />
            <div className="p-5 flex flex-col h-full gap-3 items-center relative z-10">
                <h1 className='text-3xl font-bold text-center my-10'>AI 한테 물어보세요</h1>

                <section className="flex gap-2 justify-center w-full">
                    <div
                        className="sm:w-[60%] w-[80%] rounded-2xl p-0.5
                    bg-linear-to-br from-green-300 via-blue-300 to-purple-300
                    bg-size-[300%_300%]
                    animate-gradient
                    transition-all duration-300
                  focus-within:from-green-200
                  focus-within:via-cyan-300
                  focus-within:to-blue-400
                    focus-within:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                    >

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e)=> setInputValue(e.target.value)}
                            onKeyDown={(e)=> e.key === 'Enter' && handleSearch()}
                            className="w-full p-5 rounded-2xl bg-white outline-none"
                            placeholder="예: BBQ 황금올리브 치킨 한 마리, 나에게 맞는 식단 추천 해줘"
                        />
                    </div>

                    <button
                        onClick={() => setIsAnalyzing(true)}
                        className=" bg-black flex items-center text-white p-5 px-8 rounded-2xl  cursor-pointer">
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isAnalyzing ?
                            <span className="flex gap-1 text-lg">
                                <span className="animate-bounce [animation-delay:0ms]">.</span>
                                <span className="animate-bounce [animation-delay:150ms]">.</span>
                                <span className="animate-bounce [animation-delay:300ms]">.</span>
                            </span>
                            :
                            'AI 검색'}
                    </button>
                </section>

                {/* //! grok답변 나오는곳 */}
                <section className="backdrop-blur-lg bg-white/70 sm:w-[80%] w-[90%] shadow-md flex-1 rounded-xl p-5 overflow-y-auto">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <p>AI가 영양 성분을 계산하고 있습니다...</p>
                        </div>
                    )
                    : (
                        <SearchGuide />
                    )
                    }
                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-500" /> AI의 분석 결과
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{result.description}</p>
                            </div>

                            <div className="grid gap-4">
                                {result.foods.map((food, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg">{food.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {food.unit} | {food.calorie}kcal | 단백질 {food.protein}g
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleSaveToDaily('liked', food)}
                                                className="flex flex-col items-center p-2 hover:bg-pink-50 rounded-lg transition-colors group">
                                                <Heart className="w-5 h-5 text-pink-500 group-hover:fill-pink-500" />
                                                <span className="text-[10px] mt-1">좋아요</span>
                                            </button>
                                            <button 
                                                onClick={() => handleSaveToDaily('daily', food)}
                                                className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                                <span className="text-[10px] mt-1">식단추가</span>
                                            </button>
                                            <button 
                                                onClick={() => handleSaveToDaily('general', food)}
                                                className="flex flex-col items-center p-2 hover:bg-green-50 rounded-lg transition-colors">
                                                <Database className="w-5 h-5 text-green-500" />
                                                <span className="text-[10px] mt-1">음식저장</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>

    )
}

// TODO ai답변은 양(그램이든 갯수든)당 칼로리, 단백질, 추가(boolean으로),liked(saved음식에 들어가게)
// TODO 의 json형태로 와야함 그래야 바로 추가나 saved페이지에 넣을 수 있음. 답은 그냥 문자로 하고 클릭시 json형태로