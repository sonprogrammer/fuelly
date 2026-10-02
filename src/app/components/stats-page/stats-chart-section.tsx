'use client'

import { StatsChartSectionProps } from '@/app/components/stats-page/types'
import dynamic from 'next/dynamic'


const DailyMealChart = dynamic(() => import('@/app/components/DailyMealChart').then((mod) => mod.DailyMealChart), {
    ssr: false,
    loading: () => (
        <div className="h-[300px] flex items-center justify-center text-gray-500 animate-pulse">
            차트 로딩 중...
        </div>
    )
})


export function StatsChartSection({ isPendingMeal, range, allMeal, PRO_LIMIT, CAL_LIMIT }: StatsChartSectionProps) {

    if (isPendingMeal) return (
        <div className="mb-10">
            <h1 className="text-gray-400">
                {`최근 ${range}일 기록`}
            </h1>

            <div className="h-[300px] flex items-center justify-center text-gray-500 animate-pulse">
                데이터 불러오는 중...
            </div>
        </div>
    )

    return (
        <div className='그래프 mb-10'>
            <h1 className="text-gray-400">{`최근 ${range}일 기록`}</h1>
            <DailyMealChart sortedMeals={allMeal} CAL_LIMIT={CAL_LIMIT} PRO_LIMIT={PRO_LIMIT} />

        </div>
    )
}