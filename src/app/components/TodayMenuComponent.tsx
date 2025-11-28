import MenuItem from './MenuItem'

export default function TodayMenuComponent () {
    const data = []

    const foods = [
        { name: '아몬드', calories: 579, protein: 21, unit: '100g' },
        { name: '프로틴 쉐이크', calories: 120, protein: 24, unit: '1스쿱' },
    ]
    return(
        <div className="rounded-md border border-gray-300 p-5 bg-white">
            <h1>오늘 먹은 음식</h1>
            <div className="min-h-[100px] relative">
            {data.length === 1 ? 
                <section className="absolute inset-0 flex justify-center items-center">
                   <p className="text-gray-400">아직 기록된 음식이 없습니다.</p>
                </section>
                : 
                <section className="flex flex-col gap-3 max-h-96 overflow-y-auto mt-5">
                    {foods.map((food) => (
                        <MenuItem food={food} type='delete' key={food.name}/>
                    ))}
                </section>

                
            }
            </div>
        </div>    
    )
}