import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await dbConnect()
        const {email: nickName} = await req.json()
        // console.log('email from check-email server', email)
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