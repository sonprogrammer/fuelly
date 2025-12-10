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
import FoodRecordComponent from '../components/FoodRecordComponent'
import dayjs from "dayjs";

import { useState } from 'react'


const data = [
    { date: "12/01", calories: 1800, proteins: 100 },
    { date: "12/02", calories: 2100, proteins: 150 },
    { date: "12/03", calories: 1700, proteins: 200 },
    { date: "12/04", calories: 2300, proteins: 100 },
    { date: "12/01", calories: 1800, proteins: 100 },
    { date: "12/02", calories: 2100, proteins: 150 },
    { date: "12/03", calories: 1700, proteins: 200 },
];


const CAL_LIMIT = 3000;
const PRO_LIMIT = 200;
interface MealData {
    date: string;
    calories: number;
    proteins: number;
    meals: string[];
}


const sampleData: MealData[] = [
    { date: "2025-12-01", calories: 1800, proteins: 100, meals: ["계란 2개", "닭가슴살 100g"] },
    { date: "2025-12-02", calories: 2200, proteins: 120, meals: ["고구마 150g", "연어 80g"] },
    { date: "2025-12-03", calories: 2000, proteins: 150, meals: ["바나나 1개", "두부 100g"] },
];


export default function StatsPage() {
    const [range, setRange] = useState<7 | 30 | null>(null);

    const today = dayjs();

    const filteredData = sampleData.filter((item) => {
        const diff = today.diff(dayjs(item.date), "day");
        return diff <= Number(range);
    });

    return (
        <div className="p-5 h-full">
            <div className='그래프 '>
                <h1 className="text-gray-400">최근 7일 기록</h1>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 5 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />

                        <YAxis
                            yAxisId="cal"
                            domain={[0, Math.max(CAL_LIMIT, Math.max(...data.map(d => d.calories))) + 1000]}
                            tickFormatter={(value) => `${value} Kcal`}
                            width={10}
                        />

                        <YAxis
                            yAxisId="pro"
                            orientation="right"
                            domain={[0, Math.max(PRO_LIMIT, Math.max(...data.map(d => d.proteins))) + 80]}
                            tickFormatter={(value) => `${value} g`}
                            width={10}
                        />

                        <Tooltip />


                        <ReferenceLine y={CAL_LIMIT} yAxisId="cal" stroke="#fca5a5" strokeDasharray="5 5" strokeWidth={1.5}
                            label={{ value: "Kcal 목표", position: "top", fill: "#f87171", fontSize: 12 }}
                        />

                        <ReferenceLine y={PRO_LIMIT} yAxisId="pro" stroke="#93c5fd" strokeDasharray="5 5" strokeWidth={1.5}
                            label={{ value: "단백질 목표", position: "bottom", fill: "#3b82f6", fontSize: 12 }}
                        />
                        {/* 칼로리-왼쪽  */}
                        <Bar yAxisId="cal" dataKey="calories" fill="#4f46e5" radius={[6, 6, 0, 0]} />

                        {/* 단백질-오른쪽 */}
                        <Bar yAxisId="pro" dataKey="proteins" fill="#ef4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>



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

                {/* 날짜 필터된 데이터만 나오게 */}
                <section className={
                    filteredData.length > 0
                        ? "grid grid-cols-1 sm:grid-cols-2"
                        : ""
                }>
                    {filteredData.length > 0 ? (
                        filteredData.map((day) => (
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
