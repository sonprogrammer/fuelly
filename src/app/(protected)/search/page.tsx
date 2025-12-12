export default function AISearchPage() {

    return (
        <div className="p-5 flex flex-col h-full gap-3 items-center">
            <h1 className='text-3xl font-bold text-center my-10'>AI 한테 물어보세요</h1>

            <section className="flex gap-1 justify-center w-full">
                <div className="w-[60%] rounded-2xl p-0.5
                    bg-black
                    focus-within:bg-linear-to-br 
                    focus-within:from-green-200 
                    focus-within:to-blue-200 
                    transition-all"
                >

                    <input
                        type="text"
                        className="w-full p-5 rounded-2xl bg-white outline-none"
                        placeholder="예: BBQ 황금올리브 치킨 한 마리, 피자스쿨 포테이토 피자 3조각"
                    />
                </div>

                <button className="bg-black text-white p-5 px-8 rounded-2xl  cursor-pointer">
                    AI분석
                </button>
            </section>

            {/* //! gpt답변 나오는곳 */}
            <section className="backdrop-blur-lg bg-white/60 w-[80%] shadow-md flex-1 rounded-xl p-5 overflow-y-auto">

            <h2>ChatGPT의 말:</h2>
            <p>gpt한테 받아온말</p>
            </section>
        </div>
    )
}

// TODO ai답변은 양(그램이든 갯수든)당 칼로리, 단백질, 추가(boolean으로),liked(saved음식에 들어가게)
// TODO 의 json형태로 와야함 그래야 바로 추가나 saved페이지에 넣을 수 있음. 답은 그냥 문자로 하고 클릭시 json형태로