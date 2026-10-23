import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { userInfoReqSchema } from "@/schemas/user/userInfo/userInfoReq";
import { userInfoResSchema } from "@/schemas/user/userInfo/userInfoRes";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ error: '인증 불통' }, { status: 401 })
        }

        const body: unknown = await req.json()

        const res = userInfoReqSchema.safeParse(body)

        if (!res.success) {
            return NextResponse.json({ message: res.error.issues[0].message ?? '입력정보가 올바르지 않습니다' }, { status: 400 })
        }

        const { weight, height, goal, gender, activity, birthDate } = res.data

        await dbConnect()

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: 'not found user' }, { status: 404 })
        }


        user.weight = weight
        user.height = height
        user.goal = goal
        user.gender = gender
        user.activity = activity
        user.birthDate = birthDate

        await user.save()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userWithoutSensitive } = user.toObject()

        const responseData: unknown = JSON.parse(JSON.stringify({ message: 'success', user: userWithoutSensitive }))

        const response = userInfoResSchema.safeParse(responseData)

        if (!response.success) {
            return NextResponse.json({ message: response.error.issues[0].message ?? '사용자 정보가 올바르지 않습니다' }, { status: 500 })
        }


        return NextResponse.json(response.data, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}