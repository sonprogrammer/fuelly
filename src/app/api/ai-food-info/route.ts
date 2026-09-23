import { NextResponse } from "next/server";
import Groq from "groq-sdk"


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
    const { foodName } = await req.json()

    if (!foodName?.trim()) {
        return NextResponse.json(
            { error: '음식명을 입력해주세요.' },
            { status: 400 }
        )
    }

    const prompt = `
        ${foodName}에 대한 영양 성분을 알려줘 . 먼저 입력값이 실제 음식인지 판단해.
        JSON 형식으로만 대답해줘: { "isFood": boolean, "calorie": number | null, "protein": number | null, "unit": string | null}
        
        규칙:
- 실제 음식이면 isFood는 true
- 음식이 아니거나 음식으로 판단하기 어려우면 isFood는 false
- isFood가 false면 calorie, protein, unit은 null
- unit은 영양 단위가 아니라 일반적인 1회 제공량을 의미함
- 설명은 작성하지 마
        
    `

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'openai/gpt-oss-20b',
            response_format: { type: 'json_object' }
        })

        const data = JSON.parse(chatCompletion.choices[0].message.content || "{}")

        if (!data.isFood) {
            return NextResponse.json({ error: '올바른 음식명을 입력해주세요.' }, { status: 400 })
        }
        console.log('data', data)
        return NextResponse.json({
            calorie: data.calorie,
            protein: data.protein,
            unit: data.unit
        })
    } catch (error) {
        return NextResponse.json({ error: 'AI 분석 실패' }, { status: 500 })
    }
}