import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"



const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
    try{
        const {prompt} = await req.json()

        if(!prompt){
            return NextResponse.json({message:'no prompt provied'}, {status:400})
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: 'llama-3.1-8b-instant'
        })

        let answer = completion.choices[0].message?.content || ""

        if (!answer) {
            answer =
              "오늘의 작은 변화가 더 큰 성장을 만든다.\nNo matter what, JUST DO IT.";
          }
        return NextResponse.json({answer}, {status:200})
    }catch(err){
        console.log('Groqqq  errr', err)
        const message = '오늘의 작은 변화가 더 큰 성장을 만든다 \n No matter what, JUST DO IT '
        return NextResponse.json(message, {status: 500})
    }
}
