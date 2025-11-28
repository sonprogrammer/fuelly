export default function ManualMenu() {

    return(
        <div className="flex flex-col gap-2 bg-white p-5 rounded-md border border-gray-300">
            <h1 className="font-bold ">AI로 음식 분석하기</h1>
            <p className='text-gray-500'>{`"피자 3조각", "치킨 1마리" 등 자세히 입력하면 AI가 영양 정보를 계산합니다.`}</p>

            <section className="flex gap-5 w-full">
                <input 
                    className="flex-1 bg-gray-100 p-2 border border-gray-200 rounded-md"
                    type="text" placeholder="예: 김치찌개 1인분, 피자 3조각"/>
                <button className="bg-black text-white px-5 rounded-lg cursor-pointer">
                    AI분석
                </button>
            </section>

            <h2 className="text-gray-500">💡 GPT API 연동 시 정확한 영양 정보를 제공합니다.</h2>
        </div>    
    )
}