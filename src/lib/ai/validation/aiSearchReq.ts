import { aiSearchRequestSchema } from "@/schemas/ai/aiSearch/aiSearchReq"




export interface AiSearchRequest {
    prompt: string
    remain: {
        calorie: number
        protein: number
    }
}

type AiSearchValidationResult ={
      valid: true
      data: AiSearchRequest
    }
  | {
      valid: false
      message: string
    }

export function validateAiSearchRequest(data: unknown): AiSearchValidationResult {
    const res = aiSearchRequestSchema.safeParse(data)

    if(!res.success){
        return { valid: false, message: res.error.issues[0].message ?? '요청데이터가 올바르지 않습니다.'}
    }

    return {
        valid: true,
        data: res.data
    }
}