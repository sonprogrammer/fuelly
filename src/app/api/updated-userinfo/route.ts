import dbConnect from "@/lib/mongoose"
import userModel from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import {userInfoFromToken} from '@/lib/userInfoFromToken'

export async function PATCH(req: NextRequest) {
    try{
        await dbConnect()
        const userInfo = await userInfoFromToken(req)

        const update = await req.json()
        console.log('upate', update)

        if(!userInfo){
            return NextResponse.json({message:'invalid user token'},{status:401})
        }

        if(!update){
            return NextResponse.json({message:'data is not provided'},{status:400})
        }

        const userUpdated = await userModel.findByIdAndUpdate(
            userInfo.objectId, 
            {$set: update},
            {new: true}
        )
        return NextResponse.json({message:'success' , userUpdated}, { status: 200 })
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message:'interver server error'},{status:500})
    }
}