import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server"
import { userInfoFromToken } from "@/lib/userInfoFromToken"

export async function POST(req: NextRequest){
    try{

        const data = await req.json()
        
        await dbConnect()
        
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo){
            return NextResponse.json({message: 'user token invalid'}, {status: 401})
        }
        
        await Food.create({
            name: data.name,
            calorie: data.calorie,
            protein: data.protein,
            unit: data.unit,
            createdBy: userInfo.objectId
        })
        
        
        return NextResponse.json({success: true}, {status:200})
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message:'internal server error'}, {status: 500})
    }
} 