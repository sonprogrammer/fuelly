import { z} from 'zod'

const objectIdSchema = z.hex().length(24)

const savedFoodDocumentSchema = z.object({
    _id: objectIdSchema,
    name: z.string(),
    protein: z.number().min(0),
    calorie: z.number().min(0),
    unit: z.string(),
    createdBy: z.string().optional(),
    createdAt: z.iso.datetime()
})

export const savedFoodsResSchema = z.array(
    z.object({
        _id: objectIdSchema,
        savedUser: objectIdSchema,
        food: savedFoodDocumentSchema
    })
)