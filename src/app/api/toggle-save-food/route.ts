import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"


export async function POST(req: NextRequest){
    try{
        await dbConnect()

        const userInfo = await userInfoFromToken(req)
        
        const { foodId } = await req.json()

        if(!userInfo){
            return NextResponse.json({message: 'user token is not invalid'}, {status:401})
        }
        if(!foodId){
            return NextResponse.json({message:'info is not provieded'},{status: 400})
        } 

        const isAlreadySaved = await savedModel.findOne({
            savedUser: userInfo.objectId,
            foodId
        })

        if(isAlreadySaved){
            await savedModel.deleteOne({_id: isAlreadySaved._id})
            return NextResponse.json({message:'canle saved food', isSaved: false}, {status:200})
        }else{
            const newSaved = new savedModel({
                savedUser: userInfo.objectId,
                foodId
            })
            await newSaved.save()
            return NextResponse.json({message:'save food', isSaved: true}, {status: 200})
        }

        
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
}