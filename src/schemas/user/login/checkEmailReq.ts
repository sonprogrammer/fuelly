import { z} from 'zod'

export const checkEmailReqSchema = z.object({
    email: z.string().trim().min(2, '2글자 이상으로 해주세요')
})