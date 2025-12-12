import dbConnect from "@/lib/mongoose";
import Food from '@/models/foodModel'
import {  NextResponse } from "next/server";
import { basicFoods } from '../../store/basicFoods'


export async function GET(){
    try{
        dbConnect()
        const count = await Food.countDocuments()
        console.log('countda ', count)
        if(count === 0){
            await Food.insertMany(basicFoods)
        }
        const foods = await Food.find()

        return NextResponse.json({message: 'here you are', foods}, {status: 200})
        
    }catch(err){
        console.log('err', err)
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
    
}