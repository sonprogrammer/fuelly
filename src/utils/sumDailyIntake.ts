import {Food} from '@/types/food'

export const sumDailyIntake = (dailyMeal: Food[]) => {
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