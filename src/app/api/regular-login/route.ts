import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET 
  );

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
        const { password:_password, ...userWithoutSensitive } = user.toObject()


        const accessToken = await new SignJWT({
            objectId: user._id.toString(),
            nickName: user.nickName
        })
            .setProtectedHeader({ alg: 'HS256'})
            .setExpirationTime('5m')
            .setIssuedAt()
            .sign(JWT_SECRET)

        const refreshToken = await new SignJWT({
                objectId: user._id.toString(),
                nickName: user.nickName
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('7d')
                .setIssuedAt()
                .sign(JWT_SECRET);

        const res = NextResponse.json({ success: true, user: userWithoutSensitive, accessToken })
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