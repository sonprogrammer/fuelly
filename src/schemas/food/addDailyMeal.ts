import { z} from 'zod'
import { createFoodRequestSchema } from '@/schemas/food/addNomalfood'

export const addDailyReqSchema = createFoodRequestSchema.extend({
    foodId: z.hex().length(24).optional()
})