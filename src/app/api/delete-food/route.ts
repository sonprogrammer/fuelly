import Food from '@/models/foodModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import dbConnect from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect()
        const userInfo = await userInfoFromToken(req)
        const food = await req.json()

        if (!userInfo) {
            return NextResponse.json({ message: 'user token is required' }, { status: 401 })
        }

        if (!food) {
            return NextResponse.json({ message: 'info is not proviede' }, { status: 400 })
        }

        const userId = userInfo.objectId
        console.log('userid', userId)

        const deleteFood = await Food.findOneAndDelete({ createdBy: userId, _id: food._id })

        if (!deleteFood) {
            return NextResponse.json({ message: 'not found' }, { status: 404 })
        }

        return NextResponse.json({success: true}, { status: 200})
    } catch (error) {
        console.log('err', error)
        return NextResponse.json({success: false}, { status: 500})

    }
}