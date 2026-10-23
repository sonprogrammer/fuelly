import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from "@/lib/dayjs";
import { getTodayMealResSchema } from "@/schemas/food/dailyMealRes";


export async function GET(req: NextRequest){
    try{
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo){
            return NextResponse.json({message:'user token required'}, { status: 401})
        }
        
        const today = dayjs().tz().format('YYYY-MM-DD')
        
        
        await dbConnect()
        const userDailyMeal = await dailyMeal.findOne({
            date: today,
            userId: userInfo.objectId
        })

        const response: unknown = JSON.parse(JSON.stringify({message: 'success', userDailyMeal}))

        const res = getTodayMealResSchema.safeParse(response)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ?? '오늘 식단 데이터가 올바르지 않습니다'}, {status: 500})
        }

        return NextResponse.json(res.data, {status: 200})
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal serer error'}, {status:500})
    }
}