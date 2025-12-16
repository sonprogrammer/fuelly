import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from 'dayjs'

export async function DELETE(req: NextRequest){
    try{
        await dbConnect()
        const userInfo = await userInfoFromToken(req)
        const food = await req.json()

        if(!userInfo){
            return NextResponse.json({message:'user token is required'}, {status: 401})
        }

        if (!food) {
            return NextResponse.json({ message: 'info is not proviede' }, { status: 400 })
        }

        const today = dayjs().format('YYYY-MM-DD')

        const todayMeal = await dailyMeal.findOne({
            date: today,
            userId: userInfo.objectId
        })

        if(!todayMeal){
            return NextResponse.json({ message: 'not found' }, { status: 404 })
        }

        const targetFood = todayMeal.meals.id(food._id)
        if(!targetFood){
            return NextResponse.json({ message: 'food not found' }, { status: 404 })
        }

        todayMeal.totalProtein -= targetFood.protein
        todayMeal.totalCalorie -= targetFood.calorie

        targetFood.deleteOne()
        await todayMeal.save()
        return NextResponse.json({message: 'success'},{status: 200})
        
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'interenal server eerorr'},{status: 500})

    }
}