import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const {weight, height, goal, gender, activity, age} = await req.json()
  
        await dbConnect()
        const userInfo = await userInfoFromToken(req)
    
        
        if(!userInfo){
            return NextResponse.json({error: '인증 불통'}, {status:401})
        }

        const user = await userModel.findById(userInfo.objectId)

        if(!user){
            return NextResponse.json({message: 'not found user'}, {status:404})
        }

        
        user.weight = weight
        user.height = height
        user.goal = goal
        user.gender = gender
        user.activity = activity
        user.age = age
        
        await user.save()
        
        const { password:_password, ...userWithoutSensitive } = user.toObject()


        return NextResponse.json(
            { message: "Success", user: userWithoutSensitive }, 
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}