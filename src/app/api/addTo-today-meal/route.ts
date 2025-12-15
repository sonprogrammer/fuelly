
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import dailyMeal from '@/models/dailyModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dayjs from 'dayjs'

export async function POST(req:NextRequest){
    try{

        const food = await req.json()
        
        await dbConnect()

        const userInfo = await userInfoFromToken(req)
        if(!userInfo){
            return NextResponse.json({message: 'user token invalid'}, {status: 401})
        }

        if(!food){
            return NextResponse.json({message: 'info is not proviede'}, {status: 400})
        }

        const today = dayjs().format('YY-MM-DD')

        const todayMeal = await dailyMeal.findOne({
            
        })
        
    }catch(err){
        console.log('err',err) 
    }
}