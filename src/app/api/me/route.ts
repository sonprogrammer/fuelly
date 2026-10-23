import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { getUserResSchema } from "@/schemas/user/userInfo/getUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try {
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo?.objectId){
            return NextResponse.json({message:'인증되지 않은 사용자입니다.'}, {status: 401})
        }
        
        await dbConnect()
        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다.' },{ status: 404 })
        }

        const res:unknown = JSON.parse(JSON.stringify({user}))

        const result =getUserResSchema.safeParse(res)

        if(!result.success){
            return NextResponse.json({ message: '사용자 응답 데이터가 올바르지 않습니다.' },{ status: 500 })
        }
  
        return NextResponse.json(result.data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'failed to find user'}, { status: 500})
    }
}