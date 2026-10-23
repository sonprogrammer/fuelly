import { z } from 'zod';

const objectIdSchema = z.hex({error: 'ID 형식이 올바르지 않습니다.'}).length(24, 'ID는 24자리여야 합니다.')

export const frequentFoodSchema = z.object({
    _id: objectIdSchema,
    foodId: objectIdSchema.nullable(),
    name: z.string(),
    calorie: z.number().min(0),
    protein: z.number().min(0),
    unit: z.string(),
    count: z.number().int().min(1)
})

export const frequentFoodsResSchema = z.object({
    message: z.literal('success'),
    frequentFoods: z.array(frequentFoodSchema).max(5)
})