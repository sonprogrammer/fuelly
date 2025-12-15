import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import { NextRequest, NextResponse } from "next/server";
import { basicFoods } from '../../store/basicFoods'
import {userInfoFromToken} from '@/lib/userInfoFromToken'


export async function GET(req: NextRequest){
    try{
        dbConnect()
        const count = await Food.countDocuments()
        const userInfo = await userInfoFromToken(req)

        if(!userInfo){
            return NextResponse.json({message: 'user token invalid'},{status:401})
        }
        
        if(count === 0){
            await Food.insertMany(basicFoods)
        }

        const foods = await Food.find({
            $or:[
                {createdBy: 'system'},
                {createdBt: userInfo.objectId}
            ]
        })

        return NextResponse.json({message: 'here you are', foods}, {status: 200})
        
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
    
}