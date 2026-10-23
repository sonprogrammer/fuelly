import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server";
import { basicFoods } from '../../../store/basicFoods'
import { userInfoFromToken } from '@/lib/userInfoFromToken'
import { getNormalFoodsSchema } from "@/schemas/food/getNormalFood";


export async function GET(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)
        
        if (!userInfo) {
            return NextResponse.json({ message: 'user token invalid' }, { status: 401 })
        }
        
        await dbConnect()
        const count = await Food.countDocuments()
        if (count === 0) {
            await Food.insertMany(basicFoods)
        }

        const foods = await Food.find({
            $or: [
                { createdBy: 'system' },
                { createdBy: userInfo.objectId }
            ]
        })

        const sortedFoods = foods.sort((a, b) => {
            const priorityA = a.createdBy === 'system' ? 0 : 1;
            const priorityB = b.createdBy === 'system' ? 0 : 1;
            return priorityA - priorityB;
        });

        const response: unknown = JSON.parse(JSON.stringify({foods: sortedFoods}))

        const res = getNormalFoodsSchema.safeParse(response)

        if(!res.success){
            return NextResponse.json({message: '음식 목록 응답이 올바르지 않습니다'},{status: 500})
        }

        return NextResponse.json(res.data, { status: 200 })

    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }

}