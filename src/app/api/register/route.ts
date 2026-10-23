import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { registerReqSchema } from "@/schemas/user/login/registerReq";
import { registerResSchema } from "@/schemas/user/login/registerRes";



export async function POST(req: NextRequest) {
    try {
        const body: unknown = await req.json()

        const res = registerReqSchema.safeParse(body)
        if (!res.success) {
            return NextResponse.json({ message: '정보를 확인할수 없습니다' }, { status: 400 })
        }

        const data = res.data

        const nickName = data.nickName
        const password = data.password

        const hashedPassword = await bcryptjs.hash(password, 10)

        await dbConnect()

        const newUser = await userModel.create({
            nickName,
            password: hashedPassword
        })

        const responseData: unknown = JSON.parse(JSON.stringify({ success: true, message: '회원가입이 완료되었습니다.', user: newUser }))

        const response = registerResSchema.safeParse(responseData)

        if (!response.success) {
            return NextResponse.json({ success: false, messaeg: response.error.issues[0].message }, { status: 500 })
        }


        return NextResponse.json(response.data, { status: 201 })
    } catch (error) {
        console.log('error', error)
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            return NextResponse.json(
                { success: false, message: '이미 사용 중인 닉네임입니다.' },
                { status: 409 }
            )
        }
        return NextResponse.json({ success: false, message: 'internal server erorr' })
    }
}