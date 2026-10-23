import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import { toggleSaveReqSchema } from "@/schemas/food/toggleSaveFoodReq";
import foodModel from "@/models/foodModel";


export async function POST(req: NextRequest) {
    try {

        const userInfo = await userInfoFromToken(req)


        if (!userInfo?.objectId) {
            return NextResponse.json({ message: 'user token is not invalid' }, { status: 401 })
        }
        const body: unknown = await req.json()

        const res = toggleSaveReqSchema.safeParse(body)

        if (!res.success) {
            return NextResponse.json({ message: res.error.issues[0]?.message ?? '잘못된 음식정보입니다' }, { status: 400 })
        }

        const { foodId } = res.data

        await dbConnect()
        const isAlreadySaved = await savedModel.findOne({
            savedUser: userInfo.objectId,
            foodId
        })

        if (isAlreadySaved) {
            await savedModel.deleteOne({ _id: isAlreadySaved._id, savedUser: userInfo.objectId })
            return NextResponse.json({ message: 'cancle saved food', isSaved: false }, { status: 200 })
        }


        const foodExists = await foodModel.exists({ _id: foodId })

        if (!foodExists) {
            return NextResponse.json(
                { message: '음식을 찾을 수 없습니다.' },
                { status: 404 }
            )
        }

        await savedModel.create({
            savedUser: userInfo.objectId,
            foodId
        })
        return NextResponse.json({ message: 'save food', isSaved: true }, { status: 200 })



    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}