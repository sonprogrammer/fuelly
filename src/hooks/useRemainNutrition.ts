import amountCalculate from '@/utils/amountCalculate'
import { sumDailyIntake } from '@/utils/sumDailyIntake'
import useGetDailyMeal from './useGetDailyMeal'
import { User, FixedUser } from '@/types/user'


const isNutritionUser = (user: User): user is FixedUser => {
    return (
      user.height != null &&
      user.weight != null &&
      user.age != null &&
      user.gender != null &&
      user.activity != null &&
      user.goal != null
    )
  }

const useRemainNutrition = (user: User | null) => {


    const { data: dailyMeal, isPending } = useGetDailyMeal()

    if (!user || !isNutritionUser(user)) {
        return {
            isPending: true,
            recommended: { calorie: 0, protein: 0 },
            consumed: { dailyCalorie: 0, dailyProtein: 0 },
            remain: { calorie: 0, protein: 0 },
            exceed: { calorie: 0, protein: 0 },
        }
    }


    const { recommendedCalories, recommendedProteins } = amountCalculate(user)
    const meals = dailyMeal?.meals ?? []

    const { dailyCalorie, dailyProtein } = sumDailyIntake(meals)

    const remainCalorie = Math.max(recommendedCalories - dailyCalorie, 0)
    const remainProtein = Math.max(recommendedProteins - dailyProtein, 0)
    const exceededCalorie = Math.max(dailyCalorie - recommendedCalories, 0)
    const exceededProtein = Math.max(dailyProtein - recommendedProteins, 0)

    return {
        isPending,
        recommended: {
            calorie: recommendedCalories,
            protein: recommendedProteins
        },
        consumed: {
            dailyCalorie,
            dailyProtein
        },
        remain: {
            calorie: remainCalorie,
            protein: remainProtein
        },
        exceed: {
            calorie: exceededCalorie,
            protein: exceededProtein
        }
    }
}


export default useRemainNutrition