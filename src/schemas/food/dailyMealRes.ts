import { z} from 'zod'

const objectIdSchema = z.hex().length(24)

export const dailyMealItemSchema = z.object({
    _id: z.string(),
    foodId: objectIdSchema.nullable().optional(),
    name: z.string(),
    protein: z.number(),
    calorie: z.number(),
    unit: z.string()
})

export const dailyMealResSchema = z.object({
    _id: objectIdSchema,
    userId: objectIdSchema,
    date: z.string(),
    meals: z.array(dailyMealItemSchema),
    totalProtein: z.number(),
    totalCalorie: z.number(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime()
}).passthrough()

export const getTodayMealResSchema = z.object({
    message: z.literal('success'),
    userDailyMeal: dailyMealResSchema.nullable()
})