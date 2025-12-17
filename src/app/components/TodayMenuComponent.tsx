'use client'

import MenuItem from './MenuItem'
import useGetDailyMeal from '@/hooks/useGetDailyMeal'
import useDeleteDailyFood from '@/hooks/useDeleteDailyFood'
import { Food } from '@/types/food'
import { useUserStore } from '@/store/userStore'
import useRemainNutrition from '@/hooks/useRemainNutrition'

export default function TodayMenuComponent() {
    const user = useUserStore(state => state.user)
    const { data: dailyFoods, isPending } = useGetDailyMeal()
    const { consumed, remain } = useRemainNutrition(user)

    const { mutate } = useDeleteDailyFood()
    const foods = dailyFoods?.meals

    const handleDeleteBtnClick = (food: Food) => {
        mutate(food)
    }

    return (
        <div className="rounded-md border border-gray-300 p-5 bg-white">
            <h1 className='text-center'>오늘 먹은 음식</h1>
            <div className="min-h-[100px] relative">

                <section className="grid grid-cols-3 text-center border rounded-md p-3 bg-gray-50 mb-4 mt-4">
                    <div>
                        <p className="text-sm text-gray-500">섭취 칼로리</p>
                        <p className="font-bold text-red-500">
                            {consumed.dailyCalorie.toLocaleString()} kcal
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">남은 칼로리</p>
                        <p className={`font-bold ${remain.calorie < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                            {remain.calorie.toLocaleString()} kcal
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">남은 단백질</p>
                        <p className={`font-bold ${remain.protein < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {remain.protein.toLocaleString()} g
                        </p>
                    </div>
                </section>

                {isPending ?
                    <section className='h-full flex items-center justify-center'>
                        <img src='/spinner.gif' alt='spinner' className='w-20 h-20' />
                    </section>
                    :
                    !foods || foods?.length === 0 ?
                        <section className="absolute inset-0 flex justify-center items-center">
                            <p className="text-gray-400">기록된 음식이 없습니다.</p>
                        </section>
                        :
                        <section className="flex flex-col gap-3 max-h-96 overflow-y-auto mt-5">
                            {foods?.map((food: Food) => (
                                <MenuItem food={food} type='delete' key={food._id} onDelete={handleDeleteBtnClick} />
                            ))}
                        </section>
                }
            </div>
        </div>
    )
}