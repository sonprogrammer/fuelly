import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"
import { userInfoFromToken } from '@/lib/userInfoFromToken'
import userModel from '@/models/userModel'
import { differenceInYears } from 'date-fns'
import { mealRecommendationSystemPrompt, userInfoContext } from '@/lib/ai/prompts/mealRecommendation'
import { activityMap } from '@/config/activity'
import { getMealTime } from '@/utils/koreaMealTime'
import { requestWithRetry } from '@/lib/ai/requestWithRetry'
import dbConnect from '@/lib/mongoose'
import { aiRecommendFoodReqSchema } from '@/schemas/ai/aiRecommendFood/aiRecommendReq'
import { aiRecommendFoodResSchema } from '@/schemas/ai/aiRecommendFood/aiRecommendRes'




const categoryMap = {
    all: '특정 음식에 제한하지 않고 적합한 메뉴를 추천',
    delivery: '한국에서 배달로 쉽게 주문할 수 있는 메뉴를 추천',
    convenience: '한국의 주요 편의점(CU, GS25, 이마트24, 세븐일레븐 등)에서 일반적으로 구매하기 쉬운 음식 또는 음식 조합을 추천하고, 구매 가능성이 높은 편의점 이름을 음식명 뒤에 괄호로 표시. 실제 판매 여부는 매장별로 다를 수 있으므로 확실하지 않은 상품명은 만들지 말 것',
    home: '집에서 쉽게 준비하거나 만들어 먹을 수 있는 메뉴를 추천'
} as const

export async function POST(req: NextRequest) {
    const userInfo = await userInfoFromToken(req)

    if (!userInfo) {
        return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 })
    }


    try {
        const data: unknown = await req.json()

        const requestRes = aiRecommendFoodReqSchema.safeParse(data)

        if (!requestRes.success) {
            return NextResponse.json({ message: requestRes.error.issues[0].message ?? '데이터가 정확하지 않습니다.' })
        }


        const { remain, category } = requestRes.data

        const apiKey = process.env.GROQ_API_KEY
        if (!apiKey) {
            return NextResponse.json({ message: "AI 키확인" }, { status: 500 })
        }
        const groq = new Groq({ apiKey })

        await dbConnect()
        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다.' }, { status: 404 })
        }

        const userAllergies = user.aiPreference?.allergies ?? []
        const userDislikedFoods = user.aiPreference?.dislikedFoods ?? []
        const userPreferredFoods = user.aiPreference?.preferredFoods ?? []
        const userReq = user.aiPreference?.customRequest ?? ''



        const age = differenceInYears(new Date(), new Date(user.birthDate))
        const recommendationCategory = categoryMap[category]


        const mealTime = getMealTime()

        const userContext = userInfoContext({
            gender: user.gender,
            age,
            height: user.height,
            weight: user.weight,
            goal: user.goal,
            activity: activityMap[user.activity] || user.activity,
            remainCalorie: remain.calorie,
            remainProtein: remain.protein,
            mealTime,
            recommendationCategory,
            allergies: userAllergies,
            dislikedFoods: userDislikedFoods,
            preferredFoods: userPreferredFoods,
            customRequest: userReq
        })
        const completion = await requestWithRetry(() => groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: mealRecommendationSystemPrompt
                }, {
                    role: 'user',
                    content: userContext
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
        }), { retries: 1, timeoutMs: 10000 })

        const rawAnswer = completion.choices[0].message?.content

        if (!rawAnswer) {
            return NextResponse.json(
                { message: 'AI가 응답을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 503 }
            );
        }

        let parsedAnswer: unknown
        try {
             parsedAnswer = JSON.parse(rawAnswer)
        } catch (parseError) {
            console.log('err', parseError)
            return NextResponse.json({ message: 'responding error' }, { status: 500 })
        }
        const responseRes = aiRecommendFoodResSchema.safeParse(parsedAnswer)

        if(!responseRes.success){
            return NextResponse.json({message: responseRes.error.issues[0].message ?? 'ai응답 형식이 올바르지 않습니다.'})
        }
        return NextResponse.json({answer: responseRes.data}, {status: 200})
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