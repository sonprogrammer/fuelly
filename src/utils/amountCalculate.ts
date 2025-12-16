import {FixedUser, ActivityLevel} from '@/types/user'


const amountCalculate = (data: FixedUser) => {
    const { height, weight, gender, activity, goal, age} = data

    // console.log('data from amount ', data)
    // 남성 BMR=10W+6.25H−5A+5, 
    // 여성 BMR=10W+6.25H−5A−161(W=체중, H=키, A=나이)
    const BMR = gender === 'male' 
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161

    const activityFactorMap: Record<ActivityLevel, number> ={
        sedentary: 1.2,
        light: 1.37,
        moderate: 1.55,
        active: 1.73
    }

    const activityFactor = activityFactorMap[activity]

    const TDEE = BMR * activityFactor

    let recommendedCalories = TDEE
    if(goal === 'diet') recommendedCalories -= 300
    if(goal ==='bulk') recommendedCalories += 300

    let proteinPerKg = 1.2
    if(goal === 'diet') proteinPerKg = 1.8
    if(goal ==='bulk') proteinPerKg = 2
    
    const recommendedProteins = weight * proteinPerKg

    return {
        BMR: Math.round(BMR),
        TDEE: Math.round(TDEE),
        recommendedCalories: Math.round(recommendedCalories),
        recommendedProteins: Math.round(recommendedProteins)
    }
}

export default amountCalculate