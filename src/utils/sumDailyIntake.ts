import { DailyMealItem } from '@/types/dailyMeal'


export const sumDailyIntake = (dailyMeal: DailyMealItem[]) => {
    if(!dailyMeal || dailyMeal.length === 0){
        return {
            dailyCalorie: 0,
            dailyProtein: 0
        }
    }

    return dailyMeal.reduce((acc, food) => {
        acc.dailyCalorie += food.calorie
        acc.dailyProtein += food.protein
        return acc
    }, {dailyCalorie: 0, dailyProtein: 0})
}