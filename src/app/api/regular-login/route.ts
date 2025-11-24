import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const { nickName, password } = await req.json()

        const user = await userModel.findOne({ nickName })

        if (!user) {
            return NextResponse.json({ success: false, message: '아이디를 찾을 수 없습니다' })
        }

        const isMatchPW = await bcryptjs.compare(password, user.password)
        if (!isMatchPW) {
            return NextResponse.json({ success: false, message: '비밀번호를 확인해주세요' })
        }

        const accessToken = jwt.sign({
            objectId: user._id,
            nickName: user.nickName
        }, process.env.JWT_SECRET!, { expiresIn: '1h' })

        const refreshToken = jwt.sign({
            objectId: user._id,
        }, process.env.JWT_SECRET!, { expiresIn: '1h' })

        const res = NextResponse.json({ success: true, user, accessToken })
        const isProduction = process.env.NODE_ENV === 'production'
        
        res.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })

        return res

    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ success: false, message: 'internal server eror' })
    }
}