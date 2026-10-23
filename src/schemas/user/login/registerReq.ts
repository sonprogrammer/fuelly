import { z} from 'zod'

export const registerReqSchema = z.object({
    nickName: z.string().trim().min(1, '닉네임을 입력해주세요'),
    password: z.string().min(1, '비밀번호를 입력해주세요')
})