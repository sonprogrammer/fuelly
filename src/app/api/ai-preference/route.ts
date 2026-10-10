import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const { allergies, dislikedFoods, preferredFoods, customRequest } = await req.json()

        const user = await userModel.findByIdAndUpdate(userInfo.objectId,
            {
                $set: {
                    aiPreference: {
                        allergies,
                        dislikedFoods,
                        preferredFoods,
                        customRequest
                    }
                }
            },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다' }, { status: 404 })
        }

        return NextResponse.json({ message: 'AI 맞춤 설정 저장완료' }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal server. error' }, { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사요자 정볼르 찾을 수 없습니다.' }, { status: 404 })
        }

        return NextResponse.json({ meessage: 'success',
            aiPreference: user.aiPreference ?? {
                allergies: [],
                dislikedFoods: [],
                preferredFoods: [],
                customRequest: ''
            }
        },{status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'internal srver error'},{ status: 500})
    }
}