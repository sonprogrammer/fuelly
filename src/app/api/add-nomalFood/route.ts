import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server"
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import { createFoodRequestSchema } from "@/schemas/food/addNomalfood";


export async function POST(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: 'user token invalid' }, { status: 401 })
        }

        const data:unknown = await req.json()

        
        const res = createFoodRequestSchema.safeParse(data)
        
        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ??'요청 데이터가 올바르지 않습니다.'},{status: 400})
        }
        
        await dbConnect()
        
        const foodData = {
            ...res.data,
            createdBy: userInfo.objectId,
        };


      await Food.create(foodData);


        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
} 