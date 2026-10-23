import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose'
import { kakaoLoginReqSchema } from "@/schemas/user/login/kakaologinReq";
import { kakaoLoginResSchema, kakaoTokenSchema, kakaoUserResSchema } from "@/schemas/user/login/kakaologinRes";



const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function POST(req: NextRequest) {
    try {
        const body: unknown = await req.json()

        const result = kakaoLoginReqSchema.safeParse(body)

        if(!result.success){
            return NextResponse.json({success: false, message: result.error.issues[0].message ?? '요청 데이터가 올바르지 않습니다.'},{status: 400})
        }

        const { code } = result.data
        
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_REST_API_KEY!,
            redirect_uri: process.env.KAKAO_REDIRECT_URI!,
            code,
            client_secret: process.env.KAKAO_CLIENT_SECRET!
        })
        
        const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:params
        })
        
        const tokenData: unknown = await tokenRes.json()

        if(!tokenRes.ok){
            console.error('Kakao token error:', tokenData)
            return NextResponse.json({success: false, message:'failed to issue kakao token'},{status: 400})
        }

        const tokenResult = kakaoTokenSchema.safeParse(tokenData)

        if(!tokenResult.success){
            return NextResponse.json({success: false, message: '카카오 토큰응답이 올바르지 않습니다'}, {status: 502})
        }


        const kakaoAccessToken = tokenResult.data.access_token
        
        const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`
            }
        })

        const kakaoUserRes = kakaoUserResSchema.safeParse(kakaoUser.data)

        if(!kakaoUserRes.success){
            return NextResponse.json({success: false, message: '카카오 정보 응답이 올바르지 않습니다'},{status: 502})
        }
        
        const kakaoData = kakaoUserRes.data
        
        const kakaoId = kakaoData.id.toString()
        const name = kakaoData.kakao_account?.profile?.nickname?.trim() || '카카오 사용자'
        
        await dbConnect()
        let user = await userModel.findOne({ kakaoId })
        
        if (!user) {
            user = new userModel({
                kakaoId,
                name,
                createdAt: new Date()
            })
            await user.save()
        }

        const needsAgreement = !user.policy?.terms?.agreed || !user.policy?.privacy?.agreed

        const accessToken = await new SignJWT({
            objectId: user._id.toString(),
        })
            .setProtectedHeader({ alg: 'HS256' })
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

        const responseData: unknown = JSON.parse(JSON.stringify({success: true, user, accessToken, needsAgreement}))

        const responseResult = kakaoLoginResSchema.safeParse(responseData)

        if(!responseResult.success){
            return NextResponse.json({success: false, message: '로그인 응답이 올바르지 않습니다'},{ status: 500})
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
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to get Kakao user' }, { status: 500 });
    }
}