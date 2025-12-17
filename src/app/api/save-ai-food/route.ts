import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose";
import savedModel from '@/models/savedModel'
import { userInfoFromToken } from "@/lib/userInfoFromToken"
import foodModel from '@/models/foodModel'

export async function POST(req: NextRequest) {
    try{
        await dbConnect()

        const userInfo = await userInfoFromToken(req)

        const data = await req.json()
        const {name, calorie, protein, unit} = data.food

        console.log('save ai food', data)
        if(!userInfo){
            return NextResponse.json({message:'user info invalid'}, {status:401})
        }

        if(!data){
            return NextResponse.json({message:'info is not provided'},{status: 400})
        }

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