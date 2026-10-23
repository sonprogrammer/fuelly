import { z} from 'zod'

export const normalFoodResSchema = z.object({
    _id: z.hex().length(24),
    name: z.string(),
    protein: z.number(),
    calorie: z.number(),
    unit: z.string(),
    createdBy: z.string().optional(),
    saved: z.boolean(),
    createdAt: z.iso.datetime()
})

export const getNormalFoodsSchema = z.object({
    foods: z.array(normalFoodResSchema)
})