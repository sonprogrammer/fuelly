import { z} from 'zod'

export const mealShareResSchema = z.object({
    shareId: z.uuid()
})