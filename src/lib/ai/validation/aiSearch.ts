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
    if (!data || typeof data !== 'object') {
        return { valid: false, message: '요청 데이터가 올바르지 않습니다.' }
    }

    const { prompt, remain } = data as Partial<AiSearchRequest>

    if (typeof prompt !== 'string') {
        return { valid: false, message: '질문을 입력해주세요.' }
    }

    const trimmedPrompt = prompt.trim()

    if (trimmedPrompt.length < 2 || trimmedPrompt.length > 100) {
        return { valid: false, message: '질문은 2자 이상 100자 이하로 입력해주세요.' }
    }

    if (!remain || typeof remain.calorie !== 'number' || typeof remain.protein !== 'number') {
        return { valid: false, message: '남은 영양 정보가 올바르지 않습니다.' }
    }

    return {
        valid: true,
        data: {
            prompt: trimmedPrompt,
            remain
        }
    }
}