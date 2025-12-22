'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import FoodRecordComponent from '../../components/FoodRecordComponent'
import dayjs from "dayjs"
import { useState } from 'react'
import { useUserStore } from "@/store/userStore"
import useGetUserAllMeal from '@/hooks/useGetUserAllMeal'
import useRemainNutrition from '@/hooks/useRemainNutrition'
import { Food } from '@/types/food'



interface MealData {
    date: string;
    fullDate?: string;
    totalCalorie: number;
    totalProtein: number;
    meals: Food[];
    _id: string;
}


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
    });

    if (pendingtoGetMeal) return 
    <div className="p-10 text-center animate-pulse">
        데이터 로딩 중...
    </div>;

    return (
        <div className="p-5 h-full">
            <div className='그래프 '>
                <h1 className="text-gray-400">최근 7일 기록</h1>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sortedMeals} margin={{ top: 20, right: 40, left: 40, bottom: 5 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />

                        <YAxis
                            yAxisId="cal"
                            domain={[0, Math.max(CAL_LIMIT, Math.max(...sortedMeals.map((d: MealData) => d.totalCalorie) || [0])) + 1000]}
                            tickFormatter={(value) => `${value} Kcal`}
                            width={10}
                        />

                        <YAxis
                            yAxisId="pro"
                            orientation="right"
                            domain={[0, Math.max(PRO_LIMIT, Math.max(...sortedMeals.map((d: MealData) => d.totalProtein) || [0])) + 80]}
                            tickFormatter={(value) => `${value}g`}
                            width={20}
                        />

                        <Tooltip />


                        <ReferenceLine y={CAL_LIMIT} yAxisId="cal" stroke="#93c5fd" strokeDasharray="5 5" strokeWidth={1.5}
                            label={{ value: "Kcal 목표", position: "top", fill: "#3b82f6", fontSize: 12 }}
                        />

                        <ReferenceLine y={PRO_LIMIT} yAxisId="pro" stroke="#fca5a5" strokeDasharray="5 5" strokeWidth={1.5}
                            label={{ value: "단백질 목표", position: "bottom", fill: "#f87171", fontSize: 12 }} //fca5a5
                        />
                        {/* 칼로리-왼쪽  */}
                        <Bar yAxisId="cal" dataKey="totalCalorie" name='총 섭취 칼로리' fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40}/>

                        {/* 단백질-오른쪽 */}
                        <Bar yAxisId="pro" dataKey="totalProtein" name='총 섭취 단백질' fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
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
