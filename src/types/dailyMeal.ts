import { FoodInfo } from "@/types/food";


export type GroupMealsArrayType = DailyMealItem & { quantity: number}

export interface DailyMealItem {
    _id: string; //식단안에 meals배열의 각 아이디값임
    foodId?: string //음식이 저장되었을시 값
    name: string
    calorie: number;
    protein: number
    unit: string
}

export interface AddDailyMealReq extends FoodInfo{
    foodId?: string //음식 문서에 저장되어있으면 있고
}