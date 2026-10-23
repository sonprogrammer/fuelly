import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import SharedMeal from "@/models/sharedMealModel";
import userModel from "@/models/userModel";
import { mealShareReqSchema } from "@/schemas/food/mealShareReq";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo){
            return NextResponse.json({message:'로그인이 필요합니다'}, {status: 401})
        }
        
        const body:unknown = await req.json()

        const res = mealShareReqSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message??'식단 정보가 올바르지 않습니다'},{ status: 400})
        }

        const { meals, totalCalorie, totalProtein} = res.data
        
        
        const shareId = randomUUID()
        
        await dbConnect()
        const user = await userModel.findOne({_id: userInfo.objectId})

        await SharedMeal.create({
            shareId,
            displayName: user?.name || user?.nickName || 'Fuelly 사용자',
            meals, totalCalorie, totalProtein
        })
        return NextResponse.json({shareId}, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:'식단 공유 실패'}, {status: 500})
    }
}