import dbConnect from "@/lib/mongoose"
import userModel from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import {userInfoFromToken} from '@/lib/userInfoFromToken'
import { updateUserInfoReqSchema } from "@/schemas/user/userInfo/updateUserInfoReq"
import { updateUserInfoResSchema } from "@/schemas/user/userInfo/updatedUserInfoRes"



export async function PATCH(req: NextRequest) {
    try{
        const userInfo = await userInfoFromToken(req)
        if(!userInfo){
            return NextResponse.json({message:'invalid user token'},{status:401})
        }
        const body: unknown = await req.json()

        const res = updateUserInfoReqSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ?? '업데이트 목록이 잘못되었습니다'},{status: 400})
        }

        const update = res.data
        
        
        await dbConnect()
        const userUpdated = await userModel.findByIdAndUpdate(
            userInfo.objectId, 
            {$set: update},
            {new: true, runValidators: true}
        ).select('-password')

        if(!userUpdated){
            return NextResponse.json({message: '사용자를 찾을 수 없습니다'}, {status: 404})
        }

        const responseData:unknown = JSON.parse(JSON.stringify({message: 'success', userUpdated}))

        const response = updateUserInfoResSchema.safeParse(responseData)
        if(!response.success){
            return NextResponse.json({message: response.error.issues[0].message?? '사용자 수정정보가 올바르지 않습니다'},{status: 500})
        }
        
        
        return NextResponse.json(response.data, { status: 200 })
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message:'interver server error'},{status:500})
    }
}