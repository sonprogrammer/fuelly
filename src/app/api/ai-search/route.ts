import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"


const activityMap: Record<string, string> = {
    'sedentary': '거의 운동을 하지 않고 주로 앉아서 생활함',
    'light': '주 1~2회 정도 가벼운 운동을 함',
    'moderate': '주 3~5회 정도 적당한 강도의 운동을 규칙적으로 함',
    'active': '주 6회 이상 강도 높은 운동을 즐기며 활동량이 매우 많음'
};

// 목표 라벨 변환 (예시)
const goalMap: Record<string, string> = {
    'diet': '체중 감량 및 다이어트',
    'bulk': '근육량 증가 및 벌크업',
    'maintain': '현재 체중 유지 및 건강 관리'
};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
    try {
        const { prompt, user } = await req.json()

        console.log('ai-search server', prompt, user)

        if (!prompt || !user) {
            return NextResponse.json({ message: 'info is not provided' }, { status: 400 })
        }

        const userInfo = `
        - 성별/나이: ${user.gender === 'male' ? '남성' : '여성'}, ${user.age}세
        - 신체정보: 키 ${user.height}cm, 몸무게 ${user.weight}kg
        - 활동 수준: ${activityMap[user.activity] || user.activity}
        - 현재 목표: ${goalMap[user.goal] || user.goal}
        `

        const serverPrompt = `
            당신은 영양 전문가입니다.
            유저 정보를 바탕으로 ${prompt}에 대해 분석하고, 건강한 식단을 위해 3가지 추천 음식을 제안하세요.
            유저 정보는 ${userInfo}
            분석 시 유저의 활동량과 목표를 고려하여 칼로리 조절 및 영양 성분 조언을 description에 포함해줘
            [응답 규칙 및 제약 조건]
            1. 반드시 아래의 JSON 형식을 엄격히 지켜서 응답하세요. 텍스트 설명은 JSON의 "description" 필드 안에만 넣으세요.
            2. "description"에는 유저의 목표와 활동량을 고려한 구체적인 영양 조언을 포함하세요. (예: "활동량이 많으시니 단백질 보충이 중요합니다.")
            3. "foods" 배열에는 [사용자 입력 음식]을 포함하여 총 3개의 연관된 추천 음식을 넣으세요.
            4. 모든 숫자는 순수 숫자(number) 타입으로 작성하세요.

            [JSON 응답 형식 예시]
            {
                "description": "유저의 목표와 입력을 고려한 맞춤 멘트",
                "foods": [
                    { "name": "음식명", "protein": 0, "calorie": 0, "unit": "기준 단위(예시: 1개, 100g)" },
                ]
            }
            
        `

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: serverPrompt
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            response_format: {type: 'json_object'}
        })
        const rawAnswer = completion.choices[0].message?.content
        if (!rawAnswer){
            return NextResponse.json(
                { message: 'AI가 응답을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.' }, 
                { status: 503 }
            );
        }
        try{

            const parsedAnswer = JSON.parse(rawAnswer)
            
            return NextResponse.json({ message: 'success', data: parsedAnswer }, { status: 200 });
        }catch(parseError){
            console.log('err', parseError)
            return NextResponse.json({message: 'responding error'},{status: 402})
        }
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}