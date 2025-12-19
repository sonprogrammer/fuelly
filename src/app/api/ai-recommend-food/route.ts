import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest){
    try{
        const data = await req.json()
        const { user, remain} = data

        if(!user || !remain){
            return NextResponse.json({message: 'there is no info '}, {status: 400})
        }

        const prompt = `
        너는 전문 영양사야.
        사용자 정보와 남은 영양 목표, 조건과 응답 형식에 3개의 음식을 보내줘.
        단위를 제외하고 꼭 한국어로 보내줘.
        사용자 정보
        성별 : ${user.gender}
        나이 : ${user.age}
        키 : ${user.height}cm
        몸무게 : ${user.weight}kg
        목표 : ${user.goal}
        활동량 : ${user.activity}
        남은 영양 목표
        남은 칼로리 : ${remain.calorie}
        남은 단백질 : ${remain.protein}
        ❗️중요 규칙
        1. 사용자 정보의 목표에 맞는 식단 추천.(프렌차이즈(한국에 있는거로) 메뉴도 포함해도 됌 이름은 한줄로 표시해)
        2. 총 칼로리는 남은 칼로리의 80% ~ 100% 사이로 맞출 것
        3. 총 단백질은 남은 단백질의 30% ~ 40% 사이로 되도록 할 것
        4. 음식 종류는 서로 다른 카테고리로 구성할 것
            - 예: 단백질 식품 / 탄수화물 / 채소 또는 프랜차이즈 메뉴
        5. 목표에 따른 전략
            - diet: 저지방, 고단백, 과한 탄수화물 금지
            - maintain: 균형 잡힌 구성
            - bulk: 고단백 + 탄수화물 포함
        6. amount는 실제 먹을 수 있는 단위로 작성 (g, 개, 1인분 등)
        7. 음식은 정확히 3개
        8. 조건을 만족하지 못하면 다시 계산해서 응답할 것
        ❗️응답 규칙
        1. 반드시 JSON만 응답할 것
        2. 설명 문장, 인사말, 마크다운 금지 - 이거 중요함
        3. 아래 타입을 정확히 지킬 것
        응답 형식 예시. 반드시 아래 형식 데로 보내줘
        {
            'meals': [
                {
                    'name': '음식명',
                    'calorie': 숫자,
                    'protein': 숫자,
                    'amount' : 단위
                }
            ]
            
        }
        `

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
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
            
            return NextResponse.json({ message: 'success', answer: parsedAnswer }, { status: 200 });
        }catch(parseError){
            console.log('err', parseError)
            return NextResponse.json({message: 'responding error'},{status: 402})
        }
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message:'internal server error', answer: '서버오류 다시한번 시도 해주세요'}, {status: 500})
    }
}