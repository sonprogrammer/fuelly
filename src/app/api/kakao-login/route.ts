import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


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

        let user = await userModel.findOne({kakaoId})

        if(!user){
            user = new userModel({
                kakaoId,
                name,
                createdAt: new Date()
            })
            await user.save()
        }

        return NextResponse.json({
            success: true,
            message: 'kakao login success',
            user: {
                kakaoId: user.kakaoId,
                name: user.name,
                objectId: user._id
            }
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to get Kakao user' }, { status: 500 });
    }
}