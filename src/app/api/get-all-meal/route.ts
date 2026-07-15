import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from '@/lib/dayjs'

export async function GET(req: NextRequest){
    try{
        await dbConnect()
        const userInfo = await userInfoFromToken(req)

        if(!userInfo || !userInfo.objectId){
            return NextResponse.json({message: 'user info cannot find'}, { status: 401})
        }
        const { searchParams} = new URL(req.url)

        const days = parseInt(searchParams.get('days') || '7')
        console.log('datys', days)

        const startDate = dayjs().subtract(days - 1,'day').format('YYYY-MM-DD')

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