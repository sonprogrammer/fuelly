import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from '@/lib/dayjs'
import { dailyMealSchema } from "@/schemas/food/dailyMealSchema";


export async function GET(req: NextRequest){
    try{
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo || !userInfo.objectId){
            return NextResponse.json({message: 'user info cannot find'}, { status: 401})
        }

        const res = dailyMealSchema.safeParse({
            days: req.nextUrl.searchParams.get('days') ?? undefined
        })

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ?? '조회기간이 올바르지 않습니다'},{status: 400})
        }
        
        const {days} = res.data
        
        const startDate = dayjs().subtract(days - 1,'day').format('YYYY-MM-DD')
        
        await dbConnect()
        const userAllMeal = await dailyMeal.find({
            userId: userInfo.objectId,
            date: { $gte: startDate}
        }).sort({date: -1})


        return NextResponse.json({message:'success', userAllMeal}, {status: 200})
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal serveer error'}, {status:500})
    }
}