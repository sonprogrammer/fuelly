import { registerReqSchema } from '@/schemas/user/login/registerReq'
import { z} from 'zod'

export const registerForm = registerReqSchema.extend({
    checkPassword: z.string().min(1, '비밀번호를 확인해 주세요')
}).refine(data => data.password === data.checkPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['checkPassword']
})