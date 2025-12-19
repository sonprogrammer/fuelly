import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req:NextRequest) {
    try {
        const { data } = await req.json()
        const nickName = data.nickName
        const password = data.password

        const hashedPassword = await bcryptjs.hash(password, 10)

        await dbConnect()

        const newUser = await userModel.create({
            nickName,
            password: hashedPassword
        })
        return NextResponse.json({success: true, message: 'create new user', user: newUser})
    } catch (error) {
        console.log('error' ,error)
        return NextResponse.json({success: false, message: 'internal server erorr'})
    }
}