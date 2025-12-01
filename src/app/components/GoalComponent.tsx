

interface GoalProps{
    goal: string
    weight: number
}

export default function GoalComponent({goal, weight} : GoalProps){
    const goalMap: Record<string, string> = {
        bulk: '벌그업(근육 증가)',
        diet: '다이어트(체지방 감소)',
        maintain: '유지'
      }
      const goalName = goalMap[goal] || goal
    return(
        <div className='border border-green-400 p-5 rounded-md flex justify-between'>
            <section>

            <h1>현재 목표</h1>
            <button className='bg-black text-white text-sm p-1 rounded-lg'>{goalName}</button>
            </section>
            <section className='flex flex-col items-center justify-center'>
                <h1>체중</h1>
                <h1 className="font-bold">{weight}kg</h1>
            </section>
        </div>    
    )
}