import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose'
import { regularLoginReqSchema } from "@/schemas/user/login/regularLoginReq";
import { regularLoginResSchema } from "@/schemas/user/login/regularLoginRes";


const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET 
  );

export async function POST(req: NextRequest) {
    try {
        // const { nickName, password } = await req.json()
        const body:unknown = await req.json()

        const response = regularLoginReqSchema.safeParse(body)

        if(!response.success){
            return NextResponse.json({message: response.error.issues[0].message ?? '입력한 정보가 올바르지 않습니다'},{ status: 400})
        }

        const { nickName, password} = response.data
        
        await dbConnect()
        const user = await userModel.findOne({ nickName })

        if (!user || typeof user.password !== 'string') {
            return NextResponse.json({ success: false, message: '아이디 또는 비밀번호를 확인해주세요' },{ status: 401})
        }

        const isMatchPW = await bcryptjs.compare(password, user.password)
        if (!isMatchPW) {
            return NextResponse.json({ success: false, message: '아이디 또는 비밀번호를 확인해주세요' },{status: 401})
        }



        const accessToken = await new SignJWT({
            objectId: user._id.toString(),
        })
            .setProtectedHeader({ alg: 'HS256'})
            .setExpirationTime('5m')
            .setIssuedAt()
            .sign(JWT_SECRET)

        const refreshToken = await new SignJWT({
                objectId: user._id.toString(),
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('7d')
                .setIssuedAt()
                .sign(JWT_SECRET);

        const responseData: unknown = JSON.parse(JSON.stringify({success: true, user, accessToken}))

        const responseResult = regularLoginResSchema.safeParse(responseData)

        if(!responseResult.success){
            return NextResponse.json({success: false, message: '로그인 응답 데이터가 올바르지 않습니다'},{ status: 500})
        }

        const res = NextResponse.json(responseResult.data)
        const isProduction = process.env.NODE_ENV === 'production'
        
        res.cookies.set('fuellyRefreshToken', refreshToken, {
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