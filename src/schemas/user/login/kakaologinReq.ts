import { z} from 'zod'

export const kakaoLoginReqSchema = z.object({
    code: z.string().min(1,'인가 코드가 필요합니다')
})

