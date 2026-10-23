import {z} from 'zod'

export const userInfoReqSchema = z.object({
    weight: z.number().min(1, '몸무게를 입력해주세요'),
    height: z.number().min(1, '키를 입력해주세요'),
    gender: z.enum(['male', 'female']),
    goal: z.enum(['bulk', 'diet', 'maintain']),
    activity: z.enum(['sedentary', 'light', 'moderate', 'active']),
    birthDate: z.iso.date({error: '생년월일을 입력해주세요'})

})