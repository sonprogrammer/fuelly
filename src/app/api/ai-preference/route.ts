import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const data = await req.json()
        await dbConnect()

        const updateData: Record<string, unknown> = {}

        if (data.allergies !== undefined) {
            updateData['aiPreference.allergies'] = data.allergies
        }

        if (data.dislikedFoods !== undefined) {
            updateData['aiPreference.dislikedFoods'] = data.dislikedFoods
        }

        if (data.preferredFoods !== undefined) {
            updateData['aiPreference.preferredFoods'] = data.preferredFoods
        }

        if (data.customRequest !== undefined) {
            updateData['aiPreference.customRequest'] = data.customRequest
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: '수정할 정보가 없습니다.' }, { status: 400 })
        }

        const user = await userModel.findByIdAndUpdate(userInfo.objectId,
            {
                $set: updateData
            },
            { new: true, runValidators: true }
        )

        if (!user) {
            return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다' }, { status: 404 })
        }

        return NextResponse.json({ message: 'AI 맞춤 설정 저장완료', aiPreference: user.aiPreference }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal server. error' }, { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo?.objectId) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }
        
        
        const user = await userModel.findById(userInfo.objectId)


        if (!user) {
            return NextResponse.json({ message: '사요자 정볼르 찾을 수 없습니다.' }, { status: 404 })
        }

        return NextResponse.json({
            mssage: 'success',
            aiPreference: user.aiPreference ?? {
                allergies: [],
                dislikedFoods: [],
                preferredFoods: [],
                customRequest: ''
            }
        }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal srver error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findByIdAndUpdate(userInfo.objectId, {
            $set: {
                aiPreference: {
                    allergies: [],
                    dislikedFoods: [],
                    preferredFoods: [],
                    customRequest: ''
                }
            }
        },{new: true, runValidators: true})

        if(!user){
            return NextResponse.json({message: '사용자 정보를 찾을 수 없습니다'},{status: 404})
        }

        return NextResponse.json({message: 'AI 설정이 초기화 되었습니다'},{status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'internal server error'}, { status: 500})
    }
}