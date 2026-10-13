import { describe, expect, it } from 'vitest'
import { userInfoContext } from './mealRecommendation'

describe('userInfoContext', () => {
  it('사용자 정보와 AI 맞춤 설정을 올바르게 문자열로 만든다', () => {
    const result = userInfoContext({
      gender: 'male',
      age: 29,
      height: 180,
      weight: 80,
      goal: '체중 감량 및 다이어트',
      activity: '주 3~5회 정도 적당한 강도의 운동을 규칙적으로 함',
      remainCalorie: 700,
      remainProtein: 50,
      mealTime: '저녁',
      recommendationCategory: '배달 음식 추천',
      allergies: ['땅콩', '우유'],
      dislikedFoods: ['오이'],
      preferredFoods: ['한식', '고단백'],
      customRequest: '야채를 많이 추천해주세요'
    })

    expect(result).toContain('성별: 남성')
    expect(result).toContain('나이: 29')
    expect(result).toContain('키: 180cm')
    expect(result).toContain('몸무게: 80kg')
    expect(result).toContain('남은 칼로리: 700')
    expect(result).toContain('남은 단백질: 50')
    expect(result).toContain('저녁')
    expect(result).toContain('배달 음식 추천')
    expect(result).toContain('땅콩, 우유')
    expect(result).toContain('오이')
    expect(result).toContain('한식, 고단백')
    expect(result).toContain('야채를 많이 추천해주세요')
  })

  it('맞춤 설정이 비어있으면 없음으로 표시한다', () => {
    const result = userInfoContext({
      gender: 'female',
      age: 25,
      height: 165,
      weight: 55,
      goal: '현재 체중 유지 및 건강 관리',
      activity: '거의 운동을 하지 않고 주로 앉아서 생활함',
      remainCalorie: 500,
      remainProtein: 30,
      mealTime: '점심',
      allergies: [],
      dislikedFoods: [],
      preferredFoods: [],
      customRequest: ''
    })

    expect(result).toContain('알레르기: 없음')
    expect(result).toContain('먹지 않는 음식: 없음')
    expect(result).toContain('선호 음식: 없음')
    expect(result).toContain('추가 요청사항: 없음')
  })

  it('recommendationCategory가 없으면 추천 방식 문구를 만들지 않는다', () => {
    const result = userInfoContext({
      gender: 'male',
      age: 29,
      height: 180,
      weight: 80,
      goal: '체중 감량 및 다이어트',
      activity: '주 3~5회 정도 적당한 강도의 운동을 규칙적으로 함',
      remainCalorie: 700,
      remainProtein: 50,
      mealTime: '저녁',
      allergies: [],
      dislikedFoods: [],
      preferredFoods: [],
      customRequest: ''
    })

    expect(result).not.toContain('추천 방식')
  })
})