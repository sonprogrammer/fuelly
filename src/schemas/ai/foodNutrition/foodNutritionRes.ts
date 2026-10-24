import { z} from 'zod'

export const aiFoodInfoResSchema = z.object({
    calorie: z.number().min(0),
    protein: z.number().min(0),
    unit: z.string().trim().min(1)
})



export const foodNutritionResSchema = z.discriminatedUnion('isFood',[
    aiFoodInfoResSchema.extend({
        isFood: z.literal(true)
    }),
    z.object({
        isFood: z.literal(false),
        calorie: z.number().nullable(),
        protein: z.number().nullable(),
        unit: z.string().nullable()
    })
])
export type FoodAiInfo = z.infer<typeof aiFoodInfoResSchema>
