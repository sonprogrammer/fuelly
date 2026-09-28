import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"


export async function GET(req: NextRequest) {
    try{
        console.log("1. saved GET start")

        await dbConnect()
        console.log("2. db connected")


        const userInfo = await userInfoFromToken(req)
        console.log("3. userInfo", userInfo?.objectId)

        if(!userInfo){
            return NextResponse.json({message:'invalid user'},{status:401})
        }

        const savedFoods = await savedModel.find({savedUser: userInfo.objectId}).populate('foodId').lean()

        console.log("4. savedFoods", savedFoods.length)
        return NextResponse.json(savedFoods, {status:200})
    }catch(err){
        console.log('error', err)
        return NextResponse.json({message:'internal server errer'},{status:500})
    }
}