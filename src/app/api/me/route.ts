import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const payload = await userInfoFromToken(req)

        if(!payload?.objectId){
            return NextResponse.json({message:'인증되지 않은 사용자입니다.'}, {status: 401})
        }

        const user = await userModel.findById(payload.objectId)
        console.log('user from server', user )

        // if(!user){
        //     return NextResponse.json({message:'user can not find'}, { status: 404})
        // }

        return NextResponse.json({user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'failed to find user'}, { status: 500})
    }
}