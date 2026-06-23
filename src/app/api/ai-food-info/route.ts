import { NextResponse } from "next/server";
import Groq from "groq-sdk"


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request){
    const {foodName} = await req.json()

    const prompt = `
        ${foodName}에 대한 영양 성분을 알려줘 .
        JSON 형식으로만 대답해줘: { "calorie": number, "protein": number, "unit": string}
        단위는 일반적인 1회 제공량 기준이야. 설명은 생략해
    `
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{role: 'user', content: prompt}],
            model: 'llama-3.3-70b-versatile',
            response_format: {type: 'json_object'}
        })

        const data = JSON.parse(chatCompletion.choices[0].message.content || "{}")
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({error: 'AI 분석 실패'}, {status: 500})
    }
}