import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import foodModel from '@/models/foodModel'
import { saveFoodReqSchema } from "@/schemas/food/saveFoodReq";



export async function POST(req: NextRequest) {
    try{
        
        const userInfo = await userInfoFromToken(req)
        
        if(!userInfo){
            return NextResponse.json({message:'user info invalid'}, {status:401})
        }
        const body: unknown = await req.json()

        const res = saveFoodReqSchema.safeParse(body)

        if(!res.success){
            return NextResponse.json({message: res.error.issues[0].message ??'음식 정보가 올바르지 않습니다'}, {status: 400})
        }


        const {name, calorie, protein, unit} = res.data.food
        
        
        
        await dbConnect()
        const food = await foodModel.create({
            name,
            calorie,
            protein,
            unit
        })

        await savedModel.create({
            savedUser: userInfo.objectId,
            foodId: food._id
        })

        return NextResponse.json({message: 'success'}, {status:200})


    }catch(err){    
        console.log('err', err)
        return NextResponse.json({message: 'internal server erorer'}, {status: 5000})

    }
}