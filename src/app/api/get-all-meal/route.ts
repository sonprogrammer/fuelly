import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"

export async function GET(req: NextRequest){
    try{
        await dbConnect()
        const userInfo = await userInfoFromToken(req)

        if(!userInfo){
            return NextResponse.json({message: 'user token required'},{status: 401})
        }

        const userAllMeal = await dailyMeal.find({userId: userInfo.objectId})


        return NextResponse.json({message:'success', userAllMeal}, {status: 200})
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal serveer error'}, {status:500})
    }
}