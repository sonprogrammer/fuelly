
import { NextRequest, NextResponse } from "next/server";

export function POST(req:NextRequest){
    const response = NextResponse.json({success: true})

    response.cookies.set("fuellyRefreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 0, // 🔥 삭제하는 핵심!
    });

    return response

}