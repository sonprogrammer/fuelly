'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'



export default function AISearchPage() {
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)


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
                            className="w-full p-5 rounded-2xl bg-white outline-none"
                            placeholder="예: BBQ 황금올리브 치킨 한 마리, 피자스쿨 포테이토 피자 3조각"
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
                <section className="backdrop-blur-lg bg-white/60 sm:w-[80%] w-[90%] shadow-md flex-1 rounded-xl p-5 overflow-y-auto">

                    <h2>ChatGPT의 말:</h2>
                    <p>gpt한테 받아온말</p>
                </section>
            </div>
        </div>

    )
}

// TODO ai답변은 양(그램이든 갯수든)당 칼로리, 단백질, 추가(boolean으로),liked(saved음식에 들어가게)
// TODO 의 json형태로 와야함 그래야 바로 추가나 saved페이지에 넣을 수 있음. 답은 그냥 문자로 하고 클릭시 json형태로