import { dailyMealItemSchema } from '@/schemas/food/dailyMealRes'
import { z} from 'zod'

export const mealShareReqSchema = z.object({
    meals:z.array(dailyMealItemSchema).min(1, '공유할 식단이 없습니다.'), 
    totalCalorie: z.number(),
    totalProtein: z.number(),
})

