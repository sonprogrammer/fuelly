import { z} from 'zod'

export const dailyMealSchema = z.object({
    days: z.coerce.number().int('조회기간은 정수로 입력해주세요').min(1, '조회기간은 1일이상').max(30,'조회기간 최대30일').default(7)
})