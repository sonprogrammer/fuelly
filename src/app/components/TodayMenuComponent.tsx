'use client'

import MenuItem from './MenuItem'
import useGetDailyMeal from '@/hooks/useGetDailyMeal'
import useDeleteDailyFood from '@/hooks/useDeleteDailyFood'
import {Food} from '@/types/food'

export default function TodayMenuComponent () {

    const {data: dailyFoods, isPending} = useGetDailyMeal()
    const {mutate} = useDeleteDailyFood()
    const foods = dailyFoods?.meals
    
    const handleDeleteBtnClick = (food:Food)=> {
        mutate(food)
    }
    
    return(
        <div className="rounded-md border border-gray-300 p-5 bg-white">
            <h1>오늘 먹은 음식</h1>
            <div className="min-h-[100px] relative">
            {isPending ? 
            <section className='h-full flex items-center justify-center'>
                <img src='/spinner.gif' alt='spinner' className='w-20 h-20'/>
            </section>
            :
            !foods || foods?.length === 0 ? 
                <section className="absolute inset-0 flex justify-center items-center">
                   <p className="text-gray-400">기록된 음식이 없습니다.</p>
                </section>
                : 
                <section className="flex flex-col gap-3 max-h-96 overflow-y-auto mt-5">
                {foods?.map((food: Food) => (
                    <MenuItem food={food} type='delete' key={food._id} onDelete={handleDeleteBtnClick}/>
                ))}
                </section>   
            }
            </div>
        </div>    
    )
}