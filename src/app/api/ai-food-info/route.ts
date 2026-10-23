import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk"
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import { foodNutritionSystemPrompt } from "@/lib/ai/prompts/foodNutritionInfo";
import { requestWithRetry } from "@/lib/ai/requestWithRetry";
import { foodNutritionResSchema } from "@/schemas/ai/foodNutrition/foodNutritionRes";
import { foodNutritionReqSchema } from "@/schemas/ai/foodNutrition/foodNutrionReq";



export async function POST(req: NextRequest) {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
        return NextResponse.json({ message: "AI 키확인" }, { status: 500 })
    }
    const groq = new Groq({ apiKey })


    const userInfo = await userInfoFromToken(req)

    if (!userInfo) {
        return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const body: unknown = await req.json()

    const res = foodNutritionReqSchema.safeParse(body)

    if (!res.success) {
        return NextResponse.json({ message: res.error.issues[0].message ?? '요청 데이터가 올바르지 않습니다' })
    }

    const { foodName } = res.data
    if (!foodName?.trim()) {
        return NextResponse.json(
            { error: '음식명을 입력해주세요.' },
            { status: 400 }
        )
    }

    const uesrContext = `분석할 음식명 : ${foodName}`

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

        const rawContent = chatCompletion.choices[0].message.content

        if (!rawContent) {
            return NextResponse.json({ error: 'AI 응답이 비어있습니다.' }, { status: 500 })
        }

        let parsedData: unknown
        try {
            parsedData = JSON.parse(rawContent)
        } catch (error) {
            console.error('AI JSON 파싱 실패', error)
            return NextResponse.json({ error: 'AI 응답이 올바른 json 형식이 아닙니다' })
        }

        const res = foodNutritionResSchema.safeParse(parsedData)
        if (!res.success) {
            console.error('ai 영양정보 검증 실패', res.error.issues[0].message)
            return NextResponse.json({ message: 'ai 영양정보 실패' }, { status: 500 })
        }
        const data = res.data


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