'use client'

import { Food } from "@/types/food";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface MealData {
    date: string;
    fullDate?: string;
    totalCalorie: number;
    totalProtein: number;
    meals: Food[];
    _id: string;
}


interface DailyMealChartProps {
    sortedMeals: MealData[];
    CAL_LIMIT: number;
    PRO_LIMIT: number;
}

export function DailyMealChart({ sortedMeals, CAL_LIMIT, PRO_LIMIT }: DailyMealChartProps) {

    const PAGE_SIZE = 7
    const [page, setPage] = useState(0)


    const sortedData = [...(sortedMeals || [])].sort((a, b) =>
        dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    )
    const totalPages = Math.ceil(sortedData.length / PAGE_SIZE)

    const endIndex = sortedData.length - page * PAGE_SIZE
    console.log('end', endIndex)

    const startIndex = Math.max(0, endIndex - PAGE_SIZE)
    const isFirst = endIndex === PAGE_SIZE || startIndex === 0
    const isLast = page === 0

    const pageData = sortedData.slice(startIndex, endIndex)
    console.log('page', pageData)


    return (
        <>

            <ResponsiveContainer width="100%" height={300} className="overflow-x-auto scrollbar-hide w-full">
                <BarChart data={pageData} margin={{ top: 20, right: 40, left: 40, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />

                    <YAxis
                        yAxisId="cal"
                        domain={[0, Math.max(CAL_LIMIT, Math.max(...sortedData.map((d: MealData) => d.totalCalorie) || [0])) + 1000]}
                        tickFormatter={(value) => `${value} Kcal`}
                        width={40}
                    />

                    <YAxis
                        yAxisId="pro"
                        orientation="right"
                        domain={[0, Math.max(PRO_LIMIT, Math.max(...sortedData.map((d: MealData) => d.totalProtein) || [0])) + 80]}
                        tickFormatter={(value) => `${value}g`}
                        width={40}
                    />

                    <Tooltip />


                    <ReferenceLine y={CAL_LIMIT} yAxisId="cal" stroke="#93c5fd" strokeDasharray="5 5" strokeWidth={1}
                        label={{ value: "Kcal 목표", position: "top", fill: "#fff", fontSize: 12 }}
                    />

                    <ReferenceLine y={PRO_LIMIT} yAxisId="pro" stroke="#fca5a5" strokeDasharray="5 5" strokeWidth={1}
                        label={{ value: "단백질 목표", position: "bottom", fill: "#fff", fontSize: 12 }}
                    />
                    <Bar yAxisId="cal" dataKey="totalCalorie" name='총 섭취 칼로리' fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={16} />

                    <Bar yAxisId="pro" dataKey="totalProtein" name='총 섭취 단백질' fill="#ef4444" radius={[6, 6, 0, 0]} barSize={16} />
                </BarChart>
            </ResponsiveContainer>
            <div className="w-full flex justify-around">

                <button
                    disabled={isFirst}
                    className={`text-white cursor-pointer ${isFirst && 'text-white/20'}`}
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                >
                    이전
                </button>

                <button
                    disabled={isLast}
                    className={`text-white cursor-pointer ${isLast && 'text-white/20'}`}
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                >
                    다음
                </button>
            </div >
        </>

    )
}