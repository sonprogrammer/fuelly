// TODO이거 없애도 댐
'use client'

import {useState} from 'react'

export default function ManualMenu() {
    const [search, setSearch] = useState<string>('')


    return(
        <div className="flex flex-col gap-2 bg-white p-5 rounded-md border border-gray-300">
            <h1 className="font-bold ">AI로 음식 분석하기</h1>
            <p className='text-gray-500'>{`"피자 3조각", "치킨 1마리" 등 자세히 입력하면 AI가 영양 정보를 계산합니다.`}
            </p>

            <section className="flex gap-5 w-full">
                <input 
                    className="flex-1 bg-gray-100 p-2 border border-gray-200 rounded-md"
                    type="text"
                    placeholder="예: 김치찌개 1인분, 피자 3조각"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                <button 
                    className="bg-black text-white px-5 rounded-lg cursor-pointer"

                >
                    AI분석
                </button>
            </section>

            <h2 className="text-gray-400 text-sm">*본 서비스의 영양 정보는 AI 분석 결과로, 실제 값과 차이가 있을 수 있습니다.</h2>
        </div>    
    )
}