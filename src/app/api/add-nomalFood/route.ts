import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server"
import { userInfoFromToken } from "@/lib/userInfoFromToken"

export async function POST(req: NextRequest) {
    try {

        const data = await req.json()

        await dbConnect()

        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: 'user token invalid' }, { status: 401 })
        }

        const foodData = {
            name: data.name,
            calorie: Number(data.calorie),
            protein: Number(data.protein),
            unit: data.unit,
            createdBy: userInfo.objectId,
        };


      await Food.create(foodData);


        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
} 