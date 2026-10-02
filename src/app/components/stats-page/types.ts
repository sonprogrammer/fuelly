import { Food } from "@/types/food";

export interface MealData {
    date: string;
    fullDate?: string;
    totalCalorie: number;
    totalProtein: number;
    meals: Food[];
    _id: string;
}

export interface GroupedMealData extends Omit<MealData, 'meals'> {
    meals: (Food & { quantity: number })[]
}



export interface StatsChartSectionProps{
    isPendingMeal: boolean;
    range: 7 | 30
    allMeal: MealData[]
    PRO_LIMIT: number;
    CAL_LIMIT: number
}

export interface StatsMealsSectionProps{
    range: 7 | 30
    setRange: (range: 7 | 30) => void
    filteredData:GroupedMealData[]
    PRO_LIMIT: number;
    CAL_LIMIT: number
    isPendingMeal: boolean
}