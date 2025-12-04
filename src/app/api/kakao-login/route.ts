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
        const { kakaoAccessToken } = await req.json()

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

        const accessToken = await new SignJWT({
            objectId: user._id.toString(),
            nickName: user.nickName
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('5m')
            .setIssuedAt()
            .sign(JWT_SECRET)

        const refreshToken = await new SignJWT({
            objectId: user._id.toString(),
            nickName: user.nickName
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .setIssuedAt()
            .sign(JWT_SECRET);

        const res = NextResponse.json({
            success: true, 
            user: {
                kakaoId: user.kakaoId,
                name: user.name,
                objectId: user._id,
                goal: user.goal,
                weight: user.weight,
                height: user.height
            }, accessToken
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