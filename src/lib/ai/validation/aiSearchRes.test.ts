import { describe, expect, it } from 'vitest'
import { isValidAiSearchRes } from './aiSearchRes'

describe('isValidAiSearchRes', () => {
  it('정상 응답이면 true를 반환한다', () => {
    const result = isValidAiSearchRes({
      description: '저녁 추천',
      foods: [
        { name: '닭가슴살 덮밥', protein: 40, calorie: 520, unit: '1인분' },
        { name: '불고기 비빔밥', protein: 32, calorie: 610, unit: '1그릇' },
        { name: '두부 김치', protein: 25, calorie: 430, unit: '1인분' }
      ]
    })

    expect(result).toBe(true)
  })

  it('foods가 3개가 아니면 false를 반환한다', () => {
    const result = isValidAiSearchRes({
      description: '저녁 추천',
      foods: [
        { name: '닭가슴살 덮밥', protein: 40, calorie: 520, unit: '1인분' }
      ]
    })

    expect(result).toBe(false)
  })

  it('영양 정보 타입이 잘못되면 false를 반환한다', () => {
    const result = isValidAiSearchRes({
      description: '저녁 추천',
      foods: [
        { name: '닭가슴살 덮밥', protein: '40', calorie: 520, unit: '1인분' },
        { name: '불고기 비빔밥', protein: 32, calorie: 610, unit: '1그릇' },
        { name: '두부 김치', protein: 25, calorie: 430, unit: '1인분' }
      ]
    })

    expect(result).toBe(false)
  })
})