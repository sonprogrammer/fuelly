'use client'

import { Food } from "@/types/food";
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
    return (
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


                <ReferenceLine y={CAL_LIMIT} yAxisId="cal" stroke="#93c5fd" strokeDasharray="5 5" strokeWidth={1}
                    label={{ value: "Kcal 목표", position: "top", fill: "#fff", fontSize: 12 }}
                />

                <ReferenceLine y={PRO_LIMIT} yAxisId="pro" stroke="#fca5a5" strokeDasharray="5 5" strokeWidth={1}
                    label={{ value: "단백질 목표", position: "bottom", fill: "#fff", fontSize: 12 }} 
                />
                {/* 칼로리-왼쪽  */}
                <Bar yAxisId="cal" dataKey="totalCalorie" name='총 섭취 칼로리' fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={16} />

                {/* 단백질-오른쪽 */}
                <Bar yAxisId="pro" dataKey="totalProtein" name='총 섭취 단백질' fill="#ef4444" radius={[6, 6, 0, 0]} barSize={16} />
            </BarChart>
        </ResponsiveContainer>
    )
}