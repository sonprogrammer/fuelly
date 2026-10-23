
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from "@/lib/dayjs";
import { addDailyReqSchema } from "@/schemas/food/addDailyMeal";



export async function POST(req: NextRequest) {
    try {

        const userInfo = await userInfoFromToken(req)
        if (!userInfo) {
            return NextResponse.json({ message: 'user token invalid' }, { status: 401 })
        }
        const body: unknown = await req.json()

        const res = addDailyReqSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ?? '음식데이터가 필요합니다'},{status: 400})
        }

        const food = res.data

        const today = dayjs().tz().format('YYYY-MM-DD')

        await dbConnect()

        let todayMeal = await dailyMeal.findOne({
            userId: userInfo.objectId,
            date: today
        })

        if (todayMeal) {
            todayMeal.meals.push({
                foodId: food.foodId ?? null, //음식문서에 저장이 안된 음식도 있음
                name: food.name,
                protein: food.protein,
                calorie: food.calorie,
                unit: food.unit
            })
            todayMeal.totalProtein += food.protein
            todayMeal.totalCalorie += food.calorie
        }else{
            todayMeal = await dailyMeal.create({
                userId:userInfo.objectId,
                date: today,
                meals:[{
                    foodId: food.foodId ?? null,
                    name: food.name,
                    protein: food.protein,
                    calorie: food.calorie,
                    unit: food.unit
                }],
                totalProtein: food.protein,
                totalCalorie: food.calorie
            })
        }

        await todayMeal.save()

        return NextResponse.json({messag: 'success'},{status: 200})

    } catch (err) {
        console.log('err', err)
        return NextResponse.json({message: 'internal sever error'},{status:500})
    }
}