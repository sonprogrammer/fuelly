import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dbConnect from "@/lib/mongoose"
import dayjs from "dayjs"
import dailyMsg from "@/models/dailyMsgModel"




const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {

    try{
         await dbConnect()
        
        const {prompt} = await req.json()
        const user = await userInfoFromToken(req)

        if(!user || !user.objectId){
            return NextResponse.json({message: '로그인 정보를 찾을 수 없습니다.'}, {status: 401})
        }

        const userId = user.objectId
        const today = dayjs().format('YYYY-MM-DD')

        const existingMsg = await dailyMsg.findOne({userId, date: today})

        if(existingMsg){
            return NextResponse.json({message: '오늘 응원메시지 요청을 소진 하였습니다.'}, { status: 403})
        }

        if(!prompt){
            return NextResponse.json({message:'no prompt provied'}, {status:400})
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content :'당신은 운동 트레이너 보조 AI입니다. 그와 관련하여 답하고 모든 응답은 무조건 반드시 한국어로만 작성하세요.'
                },
                {
                    role: "user",
                    content: `${prompt}`,
                },
            ],
            model: 'llama-3.3-70b-versatile'
        })

        let answer = completion.choices[0].message?.content || ""

        if (!answer) {
            answer =
              "오늘의 작은 변화가 더 큰 성장을 만든다.\nNo matter what, JUST DO IT.";
        }

        await dailyMsg.create({
            userId,
            message: answer,
            date: today
        })

        
        return NextResponse.json({answer}, {status:200})
    }catch(err){
        console.log('Groqqq  errr', err)
        const message = '오늘의 작은 변화가 더 큰 성장을 만든다 \n No matter what, JUST DO IT '
        return NextResponse.json(message, {status: 500})
    }
}
