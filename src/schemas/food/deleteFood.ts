import { z} from 'zod'

export const deleteFoodSchema = z.object({
    _id: z.hex({error: '음식 id가 올바르지 않습니다'}).length(24, '음식 id는 24자리입니다')//식단의 음식 객체 id임
})