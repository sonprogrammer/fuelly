import Food from '@/models/foodModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dbConnect from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { deleteFoodSchema } from '@/schemas/food/deleteFood'


export async function DELETE(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: 'user token is required' }, { status: 401 })
        }
        const userId = userInfo.objectId

        
        const body: unknown = await req.json()

        const res = deleteFoodSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message?? '삭제정보가 올바르지 않습니다'})
        }


        await dbConnect()
        const deleteFood = await Food.findOneAndDelete({ createdBy: userId, _id: res.data._id })

        if (!deleteFood) {
            return NextResponse.json({ message: 'not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log('err', error)
        return NextResponse.json({ success: false }, { status: 500 })

    }
}