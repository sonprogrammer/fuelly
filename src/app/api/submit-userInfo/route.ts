import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const {data} = await req.json()
        dbConnect()
        console.log('datga', data)
        const userInfo = await userInfoFromToken(req)

        if(!userInfo){
            return NextResponse.json({error: '인증 불통'}, {status:401})
        }

        const user = await userModel.findById(userInfo.objectId)

        if(!user){
            return NextResponse.json({message: 'not found user'}, {status:404})
        }

        user.weight = data.weight
        user.height = data.height
        user.goal = data.goal

        await user.save()
        


        return NextResponse.json(
            { message: "Success", user }, 
            { status: 200 }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}