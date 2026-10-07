export type RecommendMealCategory = 'all' | 'delivery' | 'convenience' | 'home'

export interface AiRecommendFood{
    remain:{
        calorie: number
        protein: number
    },
    category: RecommendMealCategory
}

export interface AiRecommendResult{
    meals: {
        name: string
        calorie: number
        protein: number
        amount: string
        reason: string
    }[]
}

export interface AiRecommendResultFood{
        name: string
        calorie: number
        protein: number
        amount: string
        reason?: string
}

export interface CreateFoodFromAi {
    name: string
    calorie: number
    protein: number
    unit: string
  }