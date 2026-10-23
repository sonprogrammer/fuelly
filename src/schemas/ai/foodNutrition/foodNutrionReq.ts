import { z } from 'zod'

export const foodNutritionReqSchema = z.object({
   foodName:  z.string().min(1, '음식명을 입력해주세요.')
})