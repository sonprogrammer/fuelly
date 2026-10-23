import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { checkEmailReqSchema } from "@/schemas/user/login/checkEmailReq";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
        const body:unknown = await req.json()

        const res = checkEmailReqSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({success: false,message: res.error.issues[0].message ?? '이메일을 확인해주세요'},{status: 400})
        }

        const {email: nickName} = res.data
        await dbConnect()
        const regularUser = await userModel.findOne({nickName})
        if(regularUser){
           return NextResponse.json({success: false, message:'already exist email'}) 
        }
        return NextResponse.json({success: true, message:'you can use this email'})
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({success: false, message: 'internal server error'})
    }
}