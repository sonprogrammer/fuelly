import dbConnect from "@/lib/mongoose"
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dailyMeal from "@/models/dailyModel"
import {format, subDays} from 'date-fns'
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

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
                    _id: 0,
                    foodId: 1,
                    name: 1,
                    calorie: 1,
                    protein: 1,
                    unit: 1,
                    count: 1
                }
            }
        ])

        return NextResponse.json({ message: "success", frequentFoods }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "frequent foods failed" }, { status: 500 })
    }
}