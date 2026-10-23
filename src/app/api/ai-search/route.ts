import { userInfoFromToken } from '@/lib/userInfoFromToken';
import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"
import userModel from '@/models/userModel';
import { differenceInYears } from 'date-fns';
import { userInfoContext } from '@/lib/ai/prompts/mealRecommendation';
import { activityMap } from '@/config/activity';
import {getMealTime}  from '@/utils/koreaMealTime';
import { searchSystemPrompt } from '@/lib/ai/prompts/aiSearchPrompt';
import { validateAiSearchRequest } from '@/lib/ai/validation/aiSearchReq';
import { isValidAiSearchRes } from '@/lib/ai/validation/aiSearchRes';
import { requestWithRetry } from '@/lib/ai/requestWithRetry';
import dbConnect from '@/lib/mongoose';



const goalMap: Record<string, string> = {
    'diet': '체중 감량 및 다이어트',
    'bulk': '근육량 증가 및 벌크업',
    'maintain': '현재 체중 유지 및 건강 관리'
};


export async function POST(req: NextRequest) {

    const apiKey = process.env.GROQ_API_KEY
        if (!apiKey) {
            return NextResponse.json({ message: "AI 키확인" },{ status: 500 })
        }
        const groq = new Groq({ apiKey })
        
    try {
        const body = await req.json()
        await dbConnect()

        
        const userInfo = await userInfoFromToken(req)
        
        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }
        
        const user = await userModel.findById(userInfo.objectId)
        
        if (!user) {
            return NextResponse.json({ message: '사용자 정보가 필요합니다' }, { status: 404 })
        }
        
        const validation = validateAiSearchRequest(body)
        
        if(!validation.valid){
            return NextResponse.json({message: validation.message}, {status: 400})
        }

        const { prompt, remain } = validation.data

        const age = differenceInYears(new Date(), new Date(user.birthDate))

        const mealTime = getMealTime()

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

        const completion = await requestWithRetry(() => groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: searchSystemPrompt
                },
                {
                    role: 'user',
                    content: `${userContext} 사용자 질문 : ${prompt}`
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
        }),{retries: 1, timeoutMs:10000})


        const rawAnswer = completion.choices[0].message?.content
        if (!rawAnswer) {
            return NextResponse.json(
                { message: 'AI가 응답을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.' },
                { status: 503 }
            );
        }
        try {

            const parsedAnswer = JSON.parse(rawAnswer)

            if(!isValidAiSearchRes(parsedAnswer)){
                return NextResponse.json({message: 'Ai응답 형식이 올바르지 않습니다.'}, {status: 500})
            }

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