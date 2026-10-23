import { describe, expect, it } from 'vitest'
import { validateAiSearchRequest } from './aiSearchReq'

describe('validateAiSearchRequest', () => {
  it('정상 요청이면 valid true를 반환한다', () => {
    const result = validateAiSearchRequest({
      prompt: '저녁 추천해줘',
      remain: {
        calorie: 700,
        protein: 50
      }
    })

    expect(result.valid).toBe(true)

    if (result.valid) {
      expect(result.data.prompt).toBe('저녁 추천해줘')
      expect(result.data.remain.calorie).toBe(700)
      expect(result.data.remain.protein).toBe(50)
    }
  })

  it('prompt 앞뒤 공백을 제거한다', () => {
    const result = validateAiSearchRequest({
      prompt: '  닭가슴살 추천해줘  ',
      remain: {
        calorie: 500,
        protein: 40
      }
    })

    expect(result.valid).toBe(true)

    if (result.valid) {
      expect(result.data.prompt).toBe('닭가슴살 추천해줘')
    }
  })

  it('prompt가 너무 짧으면 실패한다', () => {
    const result = validateAiSearchRequest({
      prompt: 'a',
      remain: {
        calorie: 500,
        protein: 40
      }
    })

    expect(result.valid).toBe(false)
  })

  it('remain이 없으면 실패한다', () => {
    const result = validateAiSearchRequest({
      prompt: '저녁 추천해줘'
    })

    expect(result.valid).toBe(false)
  })

  it('remain 값이 number가 아니면 실패한다', () => {
    const result = validateAiSearchRequest({
      prompt: '저녁 추천해줘',
      remain: {
        calorie: '700',
        protein: 50
      }
    })

    expect(result.valid).toBe(false)
  })
})