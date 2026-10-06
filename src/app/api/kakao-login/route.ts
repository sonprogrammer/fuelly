import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const { code } = await req.json()

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

        const tokenData = await tokenRes.json()

        if(!tokenRes.ok){
            console.error('Kakao token error:', tokenData)
            return NextResponse.json({success: false, message:'failed to issue kakao token'},{status: 400})
        }
        const kakaoAccessToken = tokenData.access_token

        const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`
            }
        })

        const kakaoData = kakaoUser.data

        const kakaoId = kakaoData.id.toString()
        const name = kakaoData.kakao_account.profile.nickname

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

        const res = NextResponse.json({
            success: true,
            user, accessToken, needsAgreement
        })
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
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to get Kakao user' }, { status: 500 });
    }
}