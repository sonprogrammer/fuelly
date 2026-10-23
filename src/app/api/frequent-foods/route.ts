import dbConnect from "@/lib/mongoose"
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dailyMeal from "@/models/dailyModel"
import {format, subDays} from 'date-fns'
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { frequentFoodsResSchema } from "@/schemas/food/frequentFoodsRes"


export async function GET(req: NextRequest) {
    try {
        await dbConnect()

        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: "user token required" }, { status: 401 })
        }

        const userId = new mongoose.Types.ObjectId(userInfo.objectId as string)


        const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd')

        const frequentFoods = await dailyMeal.aggregate([
            {
                $match: {
                    userId,
                    date: { $gte: thirtyDaysAgo }
                }
            },
            {
                $unwind: "$meals"
            },
            {
                $sort: {
                    date: 1
                }
            },
            {
                $group: {
                    _id: "$meals.name",
                    mealId: { $last: "$meals._id" },
                    count: { $sum: 1 },
                    foodId: { $last: "$meals.foodId" },
                    name: { $last: "$meals.name" },
                    calorie: { $last: "$meals.calorie" },
                    protein: { $last: "$meals.protein" },
                    unit: { $last: "$meals.unit" }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: "$mealId",
                    foodId: 1,
                    name: 1,
                    calorie: 1,
                    protein: 1,
                    unit: 1,
                    count: 1
                }
            }
        ])

        const response: unknown = JSON.parse(JSON.stringify({message: 'success', frequentFoods}))

        const res = frequentFoodsResSchema.safeParse(response)

        if(!res.success){
            console.error('자주먹는 음식응답 검증 실패', res.error.issues[0].message)
            return NextResponse.json({message: '자주 먹는 음식 데이터가 올바르지 않습니다'},{status: 500})
        }

        return NextResponse.json(res.data, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "frequent foods failed" }, { status: 500 })
    }
}