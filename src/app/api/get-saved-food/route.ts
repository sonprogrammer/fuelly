import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import foodModel from '@/models/foodModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"


export async function GET(req: NextRequest) {
    try{
        await dbConnect()

        const userInfo = await userInfoFromToken(req)

        if(!userInfo){
            return NextResponse.json({message:'invalid user'},{status:401})
        }

        const savedFoods = await savedModel.find({savedUser: userInfo.objectId}).populate('foodId')

        return NextResponse.json(savedFoods, {status:200})
    }catch(err){
        console.log('error', err)
        return NextResponse.json({message:'internal server errer'},{status:500})
    }
}