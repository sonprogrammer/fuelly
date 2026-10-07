import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"
import { userInfoFromToken } from '@/lib/userInfoFromToken'
import userModel from '@/models/userModel'
import { differenceInYears } from 'date-fns'


const activityMap: Record<string, string> = {
    'sedentary': '거의 운동을 하지 않고 주로 앉아서 생활함',
    'light': '주 1~2회 정도 가벼운 운동을 함',
    'moderate': '주 3~5회 정도 적당한 강도의 운동을 규칙적으로 함',
    'active': '주 6회 이상 강도 높은 운동을 즐기며 활동량이 매우 많음'
};

const categoryMap = {
    all: '특정 음식에 제한하지 않고 적합한 메뉴를 추천',
    delivery: '한국에서 배달로 쉽게 주문할 수 있는 메뉴를 추천',
    convenience: '한국의 주요 편의점(CU, GS25, 이마트24, 세븐일레븐 등)에서 일반적으로 구매하기 쉬운 음식 또는 음식 조합을 추천하고, 구매 가능성이 높은 편의점 이름을 음식명 뒤에 괄호로 표시. 실제 판매 여부는 매장별로 다를 수 있으므로 확실하지 않은 상품명은 만들지 말 것',
    home: '집에서 쉽게 준비하거나 만들어 먹을 수 있는 메뉴를 추천'
} as const

type RecommendMealCategory = keyof typeof categoryMap

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const { remain, category } = data

        console.log('category', category)

        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다.' }, { status: 404 })
        }

        if (!remain) {
            return NextResponse.json({ message: '남은 영양 정보가 필요합니다.' }, { status: 400 })
        }

        if (typeof remain.calorie !== 'number' || typeof remain.protein !== 'number') {
            return NextResponse.json({ message: '영양 정보가 올바르지 않습니다.' }, { status: 400 })
        }

        if (!category) {
            return NextResponse.json({ message: '추천 카테고리가 필요합니다.' }, { status: 400 })
        }

        if (!(category in categoryMap)) {
            return NextResponse.json({ message: '올바르지 않은 추천 카테고리입니다.' }, { status: 400 })
        }

        const age = differenceInYears(new Date(), new Date(user.birthDate))
        const recommendationCategory = categoryMap[category as RecommendMealCategory]

        const koreaHour = Number(new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            hour: '2-digit',
            hour12: false
        }).format(new Date())
        )

    const mealTime =
      koreaHour >= 5 && koreaHour < 11
        ? '아침'
        : koreaHour >= 11 && koreaHour < 15
          ? '점심'
          : koreaHour >= 15 && koreaHour < 17
            ? '간식'
            : koreaHour >= 17 && koreaHour < 23
              ? '저녁'
              : '야식'

        const prompt = `
        너는 전문 영양사야.
        사용자 정보와 남은 영양 목표, 현재 식사 시간대, 추천 방식을 기준으로 서로 다른 식사 메뉴를 정확히 3개 추천해.

        반드시 한국어로만 보내줘.
        사용자 정보
        성별 : ${user.gender}
        나이 : ${age}
        키 : ${user.height}cm
        몸무게 : ${user.weight}kg
        목표 : ${user.goal}
        활동량 : ${activityMap[user.activity] || user.activity}
        남은 영양 목표
        남은 칼로리 : ${remain.calorie}
        남은 단백질 : ${remain.protein}

        현재 식사 시간대
        ${mealTime}
        추천 방식
        ${recommendationCategory}

        중요 규칙
1. 사용자의 목표와 활동량에 적합한 메뉴를 추천한다.
2. 현재 식사 시간대를 고려해 자연스러운 메뉴를 추천한다.
3. 한국에서 실제로 쉽게 먹을 수 있는 메뉴를 추천한다.
4. 추천 메뉴 3개는 서로 독립적인 선택지다.
5. 세 메뉴를 조합해서 하나의 식단으로 만들지 않는다.
6. 각 메뉴는 사용자가 한 끼 또는 현재 시간대에 적합한 식사로 먹을 수 있어야 한다.
7. 각 메뉴의 칼로리는 남은 칼로리를 가능하면 초과하지 않는다.
8. 남은 단백질 보충에 도움이 되는 메뉴를 우선적으로 추천한다.
9. diet는 저지방, 고단백 위주로 추천한다.
10. maintain은 탄수화물, 단백질, 지방이 균형 잡힌 메뉴를 추천한다.
11. bulk는 충분한 단백질과 탄수화물을 포함한 메뉴를 추천한다.
12. 아침에는 지나치게 무겁거나 기름진 메뉴를 피한다.
13. 간식 시간에는 한 끼 식사보다 가볍게 먹을 수 있는 메뉴를 우선한다.
14. 야식 시간에는 남은 칼로리가 많더라도 과도하게 무겁거나 기름진 메뉴를 피하고, 소화 부담이 적은 메뉴를 우선한다.
15. amount는 "1인분", "200g", "1개"처럼 실제 섭취 가능한 단위로 작성한다.
16. 음식명은 한국어로 작성한다.
17. 한국 프랜차이즈 메뉴를 추천하는 경우 실제 존재하는 메뉴 위주로 추천한다.
18. 정확히 3개의 메뉴를 반환한다.

        응답 규칙
        1. 반드시 JSON만 응답할 것
        2. 설명 문장, 인사말, 마크다운 금지 - 이거 중요함
        3. 아래 타입을 정확히 지킬 것
        응답 형식 예시. 반드시 아래 형식 데로 보내줘
        [JSON 응답 형식 예시]
        {
            "meals": [
                {
                    "name": "음식명",
                    "calorie": 0,
                    "protein": 0,
                    "amount" : "기준 단위(예시: 1개, 100g)"
                }
            ]
            
        }
        `

        const completion = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: prompt
                }
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'meal_recommendation',
                    strict: true,
                    schema: {
                        type: 'object',
                        properties: {
                            meals: {
                                type: 'array',
                                minItems: 3,
                                maxItems: 3,
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        calorie: {
                                            type: 'number'
                                        },
                                        protein: {
                                            type: 'number'
                                        },
                                        amount: {
                                            type: 'string'
                                        }
                                    },
                                    required: ['name', 'calorie', 'protein', 'amount'],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ['meals'],
                        additionalProperties: false
                    }
                }
            }
        })

        const rawAnswer = completion.choices[0].message?.content
        if (!rawAnswer) {
            return NextResponse.json(
                { message: 'AI가 응답을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 503 }
            );
        }
        try {

            const parsedAnswer = JSON.parse(rawAnswer)

            return NextResponse.json({ message: 'success', answer: parsedAnswer }, { status: 200 });
        } catch (parseError) {
            console.log('err', parseError)
            return NextResponse.json({ message: 'responding error' }, { status: 402 })
        }
    } catch (err) {
        console.log('err', err)
        if (err instanceof Groq.APIError && err.status === 429) {
            return NextResponse.json(
                { message: 'AI 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 429 }
            )
        }
        return NextResponse.json({ message: 'internal server error', answer: '서버오류 다시한번 시도 해주세요' }, { status: 500 })
    }
}