
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import { savedFoodsResSchema } from '@/schemas/food/savedFoodsRes';


export async function GET(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)
        
        if (!userInfo) {
            return NextResponse.json({ message: 'invalid user' }, { status: 401 })
        }
        
        await dbConnect()
        const savedRecords = await savedModel.find({ savedUser: userInfo.objectId }).populate({
            path: 'foodId', model: Food
        }).lean()

        const savedFoods = savedRecords.filter(record => record.foodId != null)
            .map(({ foodId, ...record }) => ({
                ...record,
                food: foodId
            }))

        const response: unknown = JSON.parse(JSON.stringify(savedFoods))
        const res = savedFoodsResSchema.safeParse(response)

        if(!res.success){
            return NextResponse.json({message: '즐겨찾기 음식 데이터가 올바르지 않습니다'},{status: 500})
        }
        return NextResponse.json(savedFoods, { status: 200 })
    } catch (err) {
        console.log('error', err)
        return NextResponse.json({ message: 'internal server errer' }, { status: 500 })
    }
}