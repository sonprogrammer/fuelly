import { NextResponse } from "next/server";
import Groq from "groq-sdk"


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
    const { foodName } = await req.json()

    const prompt = `
        ${foodName}에 대한 영양 성분을 알려줘 .
        JSON 형식으로만 대답해줘: { "calorie": number, "protein": number, "unit": string}
        unit은 영양 단위가 아니라 "제공량"을 의미한다.

unit에 들어갈 수 있는 값의 예시:
- "1개"
- "100g"
- "1인분(200g)"
- "1그릇(300g)"
- "1팩(150g)" 이런식으로 들어갈꺼야.
        단위는 일반적인 1회 제공량 기준이야. 설명은 생략해
    `

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'openai/gpt-oss-20b',
            response_format: { type: 'json_object' }
        })

        const data = JSON.parse(chatCompletion.choices[0].message.content || "{}")
        console.log('data', data)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'AI 분석 실패' }, { status: 500 })
    }
}