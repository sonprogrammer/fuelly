import { userInfoFromToken } from '@/lib/userInfoFromToken';
import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"
import userModel from '@/models/userModel';
import { differenceInYears } from 'date-fns';
import { userInfoContext } from '@/lib/ai/prompts/mealRecommendation';
import { activityMap } from '@/config/activity';
import { mealTime } from '@/utils/koreaMealTime';
import { searchSystemPrompt } from '@/lib/ai/prompts/aiSearchPrompt';



const goalMap: Record<string, string> = {
    'diet': '체중 감량 및 다이어트',
    'bulk': '근육량 증가 및 벌크업',
    'maintain': '현재 체중 유지 및 건강 관리'
};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
    try {
        const { remain, prompt } = await req.json()

        const trimmedPrompt = prompt.trim()

        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보가 필요합니다' }, { status: 404 })
        }

        if (!remain || typeof remain.calorie !== 'number' || typeof remain.protein !== 'number') {
            return NextResponse.json({ message: '남은 영양 정보가 올바르지 않습니다.' }, { status: 400 })
        }

        if (!trimmedPrompt) {
            return NextResponse.json({ message: '프롬프트가 비었습니다.' }, { status: 400 })
        }

        if (trimmedPrompt.length > 100) {
            return NextResponse.json({ message: 'prompt is too long' }, { status: 400 })
        }
        if (trimmedPrompt.length < 2) {
            return NextResponse.json({ message: 'prompt is too short' }, { status: 400 })
        }

        const age = differenceInYears(new Date(), new Date(user.birthDate))




        const userContext = userInfoContext({
            gender: user.gender,
            age,
            height: user.height,
            weight: user.weight,
            goal: goalMap[user.goal] || user.goal,
            activity: activityMap[user.activity] || user.activity,
            remainCalorie: remain.calorie,
            remainProtein: remain.protein,
            mealTime,
            allergies: user.aiPreference?.allergies ?? [],
            dislikedFoods: user.aiPreference?.dislikedFoods ?? [],
            preferredFoods: user.aiPreference?.preferredFoods ?? [],
            customRequest: user.aiPreference?.customRequest ?? ''
        })

        const completion = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: searchSystemPrompt
                },
                {
                    role: 'user',
                    content: `${userContext} 사용자 질문 : ${trimmedPrompt}`
                }
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'ai_search',
                    strict: true,
                    schema: {
                        type: 'object',
                        properties: {
                            description: {
                                type: 'string'
                            },
                            foods: {
                                type: 'array',
                                minItems: 3,
                                maxItems: 3,
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        protein: {
                                            type: 'number'
                                        },
                                        calorie: {
                                            type: 'number'
                                        },
                                        unit: {
                                            type: 'string'
                                        }
                                    },
                                    required: ['name', 'protein', 'calorie', 'unit'],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ['description', 'foods'],
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
            return NextResponse.json({ message: 'responding error' }, { status: 502 })
        }
    } catch (err) {
        console.log('err', err)
        if (err instanceof Groq.APIError && err.status === 429) {
            return NextResponse.json(
                { message: 'AI 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 429 }
            )
        }
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}