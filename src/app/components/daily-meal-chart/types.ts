import { Food } from "@/types/food"

export interface MealData {
  date: string
  fullDate?: string
  totalCalorie: number
  totalProtein: number
  meals: Food[]
  _id: string
}

export interface DailyMealChartProps {
  sortedMeals: MealData[]
  CAL_LIMIT: number
  PRO_LIMIT: number
}

export type Metric = "calorie" | "protein"

export interface ChartHeaderProps {
  metric: Metric
  average: number
  target: number
  unit: string
  percentage: number
  onMetricChange: (metric: Metric) => void
}

export interface TooltipProps {
  active?: boolean
  payload?: {
    value: number
  }[]
  label?: string
  unit: string
}

export interface ChartPaginationProps {
  page: number
  totalPages: number
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
}