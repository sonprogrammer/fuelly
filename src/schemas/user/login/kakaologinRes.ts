import { userResSchema } from '@/schemas/user/userInfo/userRes'
import { z} from 'zod'

export const kakaoTokenSchema = z.object({
    access_token: z.string().min(1)
})

export const kakaoUserResSchema = z.object({
    id: z.number().int().positive(),
    kakao_account: z.object({
        profile: z.object({
            nickname: z.string().optional()
        }).optional()
    }).optional()
})

export const kakaoLoginResSchema = z.object({
    success: z.literal(true),
    user: userResSchema,
    accessToken: z.string().min(1),
    needsAgreement: z.boolean()
})