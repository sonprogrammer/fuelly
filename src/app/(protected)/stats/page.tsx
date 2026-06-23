'use client'


import FoodRecordComponent from '../../components/FoodRecordComponent'
import dayjs from "dayjs"
import { useState } from 'react'
import { useUserStore } from "@/store/userStore"
import useGetUserAllMeal from '@/hooks/useGetUserAllMeal'
import useRemainNutrition from '@/hooks/useRemainNutrition'
import { Food } from '@/types/food'
import dynamic from "next/dynamic";



interface MealData {
    date: string;
    fullDate?: string;
    totalCalorie: number;
    totalProtein: number;
    meals: Food[];
    _id: string;
}

const DailyMealChart = dynamic(() => import('@/app/components/DailyMealChart').then((mod) => mod.DailyMealChart),{
    ssr: false,
    loading: () => (
        <div className="h-[300px] flex items-center justify-center text-gray-500 animate-pulse">
            차트 로딩 중...
        </div>
    )
})

export default function StatsPage() {
    const [range, setRange] = useState<7 | 30>(7);

    const user = useUserStore(state => state.user)
    const { data: allMeal, isPending: pendingtoGetMeal } = useGetUserAllMeal()

    const { recommended } = useRemainNutrition(user)
    const sortedMeals = allMeal?.map((meal: MealData) => {
        return {
            date: dayjs(meal.date).format('MM-DD'),
            fullDate: meal.date,
            meals: meal.meals,
            totalCalorie: meal.totalCalorie,
            totalProtein: meal.totalProtein,
            id: meal._id
        }
    }) || []



    const CAL_LIMIT = recommended.calorie
    const PRO_LIMIT = recommended.protein
    const today = dayjs()

 

    // * 날짜별 식단 보기
    const filteredData = sortedMeals?.filter((daily: MealData) => {
        const diff = today.diff(dayjs(daily.fullDate), "day")
        return diff >= 0 && diff < (range || 7)
    }).reverse();

    if (pendingtoGetMeal) return 
    <div className="p-10 text-center animate-pulse">
        데이터 로딩 중...
    </div>;

    return (
        <div className="p-5 h-full">
            <div className='그래프 '>
                <h1 className="text-gray-400">최근 7일 기록</h1>
                <DailyMealChart sortedMeals={sortedMeals} CAL_LIMIT={CAL_LIMIT} PRO_LIMIT={PRO_LIMIT}/>
                
            </div>


            {/* //* 식단 */}
            <section className="flex gap-3 pl-5">
                <button
                    className={`px-4 py-2 rounded-lg border ${range === 7 ? "bg-blue-600 text-white" : "bg-white"}`}
                    onClick={() => setRange(7)}
                >
                    최근 7일
                </button>

                <button
                    className={`px-4 py-2 rounded-lg border ${range === 30 ? "bg-blue-600 text-white" : "bg-white"}`}
                    onClick={() => setRange(30)}
                >
                    최근 30일
                </button>
            </section>


            <section>

                <section className={
                    filteredData.length > 0
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-3 py-8"
                        : ""
                }>
                    {filteredData.length > 0 ? (
                        filteredData?.map((day: MealData) => (
                            <FoodRecordComponent
                                key={day.date}
                                sampleData={[day]}
                                CAL_LIMIT={CAL_LIMIT}
                                PRO_LIMIT={PRO_LIMIT}
                            />
                        ))
                    ) : (
                        <section className="items-center">
                            <p className='text-gray-400 text-center p-5'>
                                해당 날짜 기록이 없습니다.
                            </p>
                        </section>
                    )}
                </section>
            </section>
        </div>
    );
}
