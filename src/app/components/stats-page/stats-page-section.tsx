'use client'

import { StatsChartSection } from "@/app/components/stats-page/stats-chart-section";
import { StatsMealsSection } from "@/app/components/stats-page/stats-meal-section";
import useGetUserAllMeal from "@/hooks/useGetUserAllMeal";
import useRemainNutrition from "@/hooks/useRemainNutrition";
import { useUserStore } from "@/store/userStore";
import { DailyMealItem, GroupMealsArrayType } from "@/types/dailyMeal";
import { useState } from "react";

export function StatsPageSection() {
    const [range, setRange] = useState<7 | 30>(7);
    const { data: allMeal, isPending: pendingtoGetMeal } = useGetUserAllMeal(range)
    const user = useUserStore(state => state.user)
    const { recommended } = useRemainNutrition(user)

    const CAL_LIMIT = recommended.calorie
    const PRO_LIMIT = recommended.protein


    const groupFoods = (foodList: DailyMealItem[]) => {
        return foodList.reduce((acc: Record<string, GroupMealsArrayType>, cur) => {
            const key = JSON.stringify([
                cur.name.trim(),
                cur.unit.trim(),
                cur.calorie,
                cur.protein,
            ])
            if (acc[key]) {
                acc[key].quantity += 1
            } else {
                acc[key] = { ...cur, quantity: 1 }
            }
            return acc
        }, {})
    }

    // * 날짜별 식단 보기
    const filteredData = allMeal?.map(day => {
        const groupObj = groupFoods(day.meals)
        const groupMealsArray = Object.values(groupObj)
        return { ...day, meals: groupMealsArray }
    }) ?? []

    return (
        <>
            <StatsChartSection key={range} isPendingMeal={pendingtoGetMeal} allMeal={allMeal} range={range} CAL_LIMIT={CAL_LIMIT} PRO_LIMIT={PRO_LIMIT} />
            <StatsMealsSection isPendingMeal={pendingtoGetMeal} CAL_LIMIT={CAL_LIMIT} PRO_LIMIT={PRO_LIMIT} range={range} setRange={setRange} filteredData={filteredData} />
        </>
    )
}