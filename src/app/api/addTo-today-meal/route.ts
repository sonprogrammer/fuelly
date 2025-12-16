
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from 'dayjs'

export async function POST(req: NextRequest) {
    try {

        await dbConnect()
        const userInfo = await userInfoFromToken(req)
        const food = await req.json()


        if (!userInfo) {
            return NextResponse.json({ message: 'user token invalid' }, { status: 401 })
        }

        if (!food) {
            return NextResponse.json({ message: 'info is not proviede' }, { status: 400 })
        }

        const today = dayjs().format('YYYY-MM-DD')

        let todayMeal = await dailyMeal.findOne({
            userId: userInfo.objectId,
            date: today
        })

        if (todayMeal) {
            todayMeal.meals.push({
                foodId: food._id,
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
                    foodId: food._id,
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