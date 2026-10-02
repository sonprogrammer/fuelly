'use client'

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { format, parseISO, compareAsc } from "date-fns"

import { ChartHeader } from "./ChartHeader"

import { ChartPagination } from "./ChartPagination"

import { CHART_CONFIG, PAGE_SIZE } from "./config"

import { DailyMealChartProps, Metric } from "./types"
import { NutritionTooltip } from "@/app/components/daily-meal-chart/NutritionToolTip"

export function DailyMealChart({ sortedMeals, CAL_LIMIT, PRO_LIMIT }: DailyMealChartProps) {
  const [page, setPage] = useState(0)
  const [metric, setMetric] = useState<Metric>("calorie")

  const sortedData = useMemo(() => {
    return [...(sortedMeals || [])].sort(
      (a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
    )
  }, [sortedMeals])

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE))

  const endIndex = sortedData.length - page * PAGE_SIZE

  const startIndex = Math.max(0, endIndex - PAGE_SIZE)

  const pageData = sortedData.slice(startIndex, endIndex)

  const isFirst = startIndex === 0
  const isLast = page === 0

  const current = {
    ...CHART_CONFIG[metric],

    target:
      metric === "calorie"
        ? CAL_LIMIT
        : PRO_LIMIT,
  }

  const average = useMemo(() => {
    if (pageData.length === 0) {
      return 0
    }

    const total = pageData.reduce((sum, item) => sum + item[current.dataKey], 0)

    return Math.round(total / pageData.length)
  }, [pageData, current.dataKey])

  const percentage =current.target > 0 ? Math.round((average / current.target) * 100) : 0

  const maxValue = Math.max(current.target, ...pageData.map((item) => item[current.dataKey]),0)

  const handlePrevious = () => {
    setPage((prev) =>
      Math.min(totalPages - 1,prev + 1))
  }

  const handleNext = () => {
    setPage((prev) => Math.max(0, prev - 1))
  }

  return (
    <section className="w-full rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
      <ChartHeader
        metric={metric}
        average={average}
        target={current.target}
        unit={current.unit}
        percentage={percentage}
        onMetricChange={setMetric}
      />

      {pageData.length > 0 ? (
        <div className="h-[280px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={pageData}
              margin={{
                top: 20,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#1f2937"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 11,
                }}
                tickFormatter={(value) =>
                  format(parseISO(value),"M.d")
                }
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 11,
                }}
                domain={[
                  0,
                  Math.ceil(maxValue * 1.2),
                ]}
                tickFormatter={(value) =>value.toLocaleString()}
                width={48}
              />

              <Tooltip
                cursor={{
                  fill: "#1f2937",
                  opacity: 0.35,
                }}
                content={
                  <NutritionTooltip unit={current.unit} />
                }
              />

              <ReferenceLine
                y={current.target}
                stroke="#6b7280"
                strokeDasharray="4 4"
                strokeWidth={1}
                label={{
                  value: `목표 ${current.target.toLocaleString()}${current.unit}`,
                  position: "insideTopRight",
                  fill: "#9ca3af",
                  fontSize: 11,
                }}
              />

              <Bar
                dataKey={current.dataKey}
                name={current.label}
                fill={current.barColor}
                radius={[8, 8, 3, 3]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[280px] items-center justify-center">
          <p className="text-sm text-gray-500">
            표시할 식단 기록이 없습니다.
          </p>
        </div>
      )}

      {sortedData.length > PAGE_SIZE && (
        <ChartPagination
          page={page}
          totalPages={totalPages}
          isFirst={isFirst}
          isLast={isLast}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </section>
  )
}