import { z } from 'zod'

export const agreementReqSchema = z.object({
    termsOfService: z.literal(true, {error: '이용약관에 동의해주세요.'}),
    privacyPolicy: z.literal(true, {error: '개인정보 처리방침에 동의해주세요.'}),
    serviceImprovement: z.boolean()
})