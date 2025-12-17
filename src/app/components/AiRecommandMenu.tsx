import {AiRecommendResultFood} from '@/types/ai'
import AiRecommendProgressBar from './AiRecommendProgressBar'

interface AiRecommendMenuProps{
    data: AiRecommendResultFood
    caloriePercent: number
    proteinPercent: number
    handleAddCustom: (food:AiRecommendResultFood) => void
    handleAddDaily: (food:AiRecommendResultFood) => void
    handleSaveToggle: (food: AiRecommendResultFood) => void
    icon: React.ReactNode
}

export default function AiRecommandMenu({ data, proteinPercent,icon,handleSaveToggle, caloriePercent,handleAddCustom, handleAddDaily}: AiRecommendMenuProps){
    
    
    return (
        <div className="border relative flex flex-col gap-2 border-green-200 rounded-lg bg-linear-to-br from-white to-green-50 p-5">

        <section className='absolute top-3 right-3 flex gap-3'>
            <button 
                className='cursor-pointer'
                onClick={() => handleAddDaily(data)}>
                오늘 음식
            </button>
            <button 
                className='cursor-pointer'
                onClick={() => handleAddCustom(data)}>
                일반 음식
            </button>
        </section>
        <section className="font-bold flex items-center gap-1">
            <span>{data.name}</span>
            <span>{data.amount}</span>
            <button 
                onClick={()=>handleSaveToggle(data)}
                className='p-1 border rounded-md bg-white cursor-pointer'
            >
                {icon}
            </button>
        </section>

        <div className="text-red-300 font-semibold flex flex-col gap-1">
            <span>칼로리 : {data.calorie} kcal</span>
            <AiRecommendProgressBar percent={caloriePercent}/>
        </div>
        <div className='text-green-700 font-semibold flex flex-col gap-1'>
            <span>단백질 : {data.protein} g</span>
            <AiRecommendProgressBar percent={proteinPercent}/>
        </div>
        </div>
    )
}