import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import SharedMeal from "@/models/sharedMealModel";
import userModel from "@/models/userModel";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await dbConnect()

        const userInfo = await userInfoFromToken(req)

        if(!userInfo){
            return NextResponse.json({message:'로그인이 필요합니다'}, {status: 401})
        }

        const { meals, totalCalorie, totalProtein} = await req.json()

        if(!meals?.length){
            return NextResponse.json({message: '공유할 식단이 없습니다.'}, {status: 400})
        }

        const shareId = randomUUID()

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