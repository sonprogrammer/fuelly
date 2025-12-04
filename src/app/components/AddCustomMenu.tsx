// TODO 없애도 됨 모달로 처리함

export default function AddCustomMenu() {
    return (
        <div className="bg-white p-5 rounded-lg">
            <h1>직접 입력하기</h1>
            <p className="mb-3">영양 정보를 알고 있다면 직접 입력하세요</p>
            <input 
                className="flex-1 bg-gray-100 p-2 rounded-xl w-full mb-3"
                type="text" placeholder='음식 이름' />
            <section className="flex w-full gap-3">
                <input 
                    className='flex-1 bg-gray-100 p-2 rounded-xl '
                    type="text" placeholder='칼로리' />
                <input 
                    className='flex-1 bg-gray-100 p-2 rounded-xl'
                    type="text" placeholder='단백질(g)' />
                <input 
                    className='flex-1 bg-gray-100 p-2 rounded-xl'
                    type="text" placeholder='양 (예: 100g)' />
            </section>

            <button className='w-full bg-black text-white p-3 mt-5 rounded-xl cursor-pointer'>추가하기</button>

        </div>
    )
}