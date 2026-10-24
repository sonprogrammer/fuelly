import { z} from 'zod'

export const aiRecommendFoodResSchema = z.object({
    meals: z.array(z.object({
        name: z.string(),
        calorie: z.number(),
        protein: z.number(),
        amount: z.string()
    })).length(3)
})

export const aiRecommendFoodApiResSchema = z.object({
    answer: aiRecommendFoodResSchema
})
