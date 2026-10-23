import { z} from 'zod'

export const foodNutritionResSchema = z.discriminatedUnion('isFood',[
    z.object({
        isFood: z.literal(true),
        calorie: z.number().min(0),
        protein: z.number().min(0),
        unit: z.string().trim().min(1)
    }),
    z.object({
        isFood: z.literal(false),
        calorie: z.number().nullable(),
        protein: z.number().nullable(),
        unit: z.string().nullable()
    })
])