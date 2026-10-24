import { z} from 'zod'

export const aiFoodSchema = z.object({
    name: z.string(),
    protein: z.number(),
    calorie: z.number(),
    unit: z.string()
})

export const aiSearchResponseSchema = z.object({
    description: z.string(),
    foods: z.array(aiFoodSchema).length(3)
})

export const aiSearchApiResSchema = z.object({
    message: z.string(),
    answer: aiSearchResponseSchema
})