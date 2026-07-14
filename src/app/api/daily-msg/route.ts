import  dailyMsg from '@/models/dailyMsgModel';
import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        await dbConnect()

        const user = await userInfoFromToken(req)

        if(!user || !user.objectId){
            return NextResponse.json({message: '로그인정보를 찾을 수 없습니다.'},{ status : 401})
        }

        const userId = user.objectId
        const today = dayjs().format('YYYY-MM-DD')
        const todayMsg = await dailyMsg.findOne({userId, date: today})

        if(todayMsg){
            return NextResponse.json({answer: todayMsg.message, alreadyExist: true}, { status: 200})
        }
        return NextResponse.json({answer: null, alreadyExist: false}, { status: 200})
    } catch (error) {
        return NextResponse.json({message: 'error occured'}, { status: 500})
    }
}