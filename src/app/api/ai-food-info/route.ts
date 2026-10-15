import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk"
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import { foodNutritionSystemPrompt } from "@/lib/ai/prompts/foodNutritionInfo";
import { requestWithRetry } from "@/lib/ai/requestWithRetry";



const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
    const { foodName } = await req.json()

    const userInfo = await userInfoFromToken(req)

    if (!userInfo) {
        return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 })
    }

    if (!foodName?.trim()) {
        return NextResponse.json(
            { error: '음식명을 입력해주세요.' },
            { status: 400 }
        )
    }

    const uesrContext = `분석할 음식명 : ${foodName.trim()}`

    try {
        const chatCompletion = await requestWithRetry(() => groq.chat.completions.create({
            messages: [
                { role: 'user', content: uesrContext },
                { role: 'system', content: foodNutritionSystemPrompt }
            ],
            model: 'openai/gpt-oss-20b',
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'food_nutrition',
                    strict: true,
                    schema: {
                        type: 'object',
                        properties: {
                            isFood: {
                                type: 'boolean'
                            },
                            calorie: {
                                type: ['number', 'null']
                            },
                            protein: {
                                type: ['number', 'null']
                            },
                            unit: {
                                type: ['string', 'null']
                            },
                        },
                        required: ['isFood', 'calorie', 'protein', 'unit'],
                        additionalProperties: false
                    }
                }
            }
        })
            , { retries: 1, timeoutMs: 10000 }
        )

        const data = JSON.parse(chatCompletion.choices[0].message.content || "{}")

        if (!data.isFood) {
            return NextResponse.json({ error: '올바른 음식명을 입력해주세요.' }, { status: 400 })
        }

        return NextResponse.json({
            calorie: data.calorie,
            protein: data.protein,
            unit: data.unit
        })
    } catch (error) {
        console.error(error)
        if (error instanceof Groq.APIError && error.status === 429) {
            return NextResponse.json(
                { message: 'AI 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 429 }
            )
        }
        return NextResponse.json({ error: 'AI 분석 실패' }, { status: 500 })
    }
}