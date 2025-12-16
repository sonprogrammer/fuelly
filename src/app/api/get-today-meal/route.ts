import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from 'dayjs'

export async function GET(req: NextRequest){
    try{
        await dbConnect()
        const userInfo = await userInfoFromToken(req)

    
        if(!userInfo){
            return NextResponse.json({message:'user token required'}, { status: 401})
        }

        const today = dayjs().format('YYYY-MM-DD')

        const userDailyMeal = await dailyMeal.findOne({
            date: today,
            userId: userInfo.objectId
        })

        return NextResponse.json({message: 'success', userDailyMeal}, {status: 200})
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal serer error'}, {status:500})
    }
}