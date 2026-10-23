import { aiSearchRequestSchema } from '@/schemas/ai/aiSearch/aiSearchReq'
import { aiSearchResponseSchema } from '@/schemas/ai/aiSearch/aiSearchRes'
import { z} from 'zod'

export const createAiSearchHistoryReqSchema = z.object({
    prompt: aiSearchRequestSchema.shape.prompt,
    answer: aiSearchResponseSchema
})

export const deleteAiSearchHistoryReqSchema = z.object({
    deletedId: z.hex({error: '검색 기록id가 올바르지 안습니다'}).length(24, '검색 기록id는 24자여야합니다')
})