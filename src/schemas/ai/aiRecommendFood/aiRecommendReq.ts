import { z} from 'zod'

export const recommendMealCategorySchema = z.enum([
    'all',
    'delivery',
    'convenience',
    'home'
])


export const aiRecommendFoodReqSchema = z.object({
    remain: z.object({
        calorie: z.number(),
        protein: z.number(),
    }),
    category: recommendMealCategorySchema
})