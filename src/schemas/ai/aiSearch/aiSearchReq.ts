import { z} from 'zod'

export const aiSearchRequestSchema = z.object({
    prompt: z.string().trim().min(2, '질문은 2자 이상 100자 이하로 입력해주세요.')
                    .max(100, '질문은 2자 이상 100자 이하로 입력해주세요'),
    remain: z.object({
        calorie: z.number(),
        protein: z.number()
    })
})

