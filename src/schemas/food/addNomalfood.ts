import { z} from 'zod'

const nutritionValueSchema = z.number().min(0, '0이상의 숫자를 입력하세요')

export const createFoodRequestSchema = z.object({
    name: z.string().trim().min(1, '음식 이름을 입력해주세요.'),
    calorie: nutritionValueSchema,
    protein: nutritionValueSchema,
    unit: z.string().trim().min(1, '제공량을 입력해주세요.')
})