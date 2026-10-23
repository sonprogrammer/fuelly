import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from "@/lib/dayjs";
import { deleteFoodSchema } from "@/schemas/food/deleteFood";


export async function DELETE(req: NextRequest){
    try{
        const userInfo = await userInfoFromToken(req)
        if(!userInfo){
            return NextResponse.json({message:'user token is required'}, {status: 401})
        }
        const body:unknown = await req.json()

        const res = deleteFoodSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ?? '삭제할 식단 정보가 올바르지 않습니다'}, { status: 400})
        }

        const meal = res.data
        
    
        
        const today = dayjs().tz().format('YYYY-MM-DD')
        
        await dbConnect()
        const todayMeal = await dailyMeal.findOne({
            date: today,
            userId: userInfo.objectId
        })

        if(!todayMeal){
            return NextResponse.json({ message: 'not found' }, { status: 404 })
        }

        const targetFood = todayMeal.meals.id(meal._id)
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