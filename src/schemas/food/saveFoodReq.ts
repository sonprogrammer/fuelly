import { z } from 'zod'

export const saveFoodReqSchema = z.object({
    food: z.object({

        name: z.string().trim().min(1, '음식이름을 입력해주세요'),
        calorie: z.number().min(1, '칼로리를 입력해주세요'),
        protein: z.number().min(1, '단백질을 입력해주세요'),
        unit: z.string().min(0)
    })
})