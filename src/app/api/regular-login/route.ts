import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await dbConnect()
        
    } catch (error) {
        
    }
}