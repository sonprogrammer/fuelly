import { NextRequest, NextResponse } from "next/server";
import { errors, jwtVerify } from "jose";
import { redis } from "@/lib/redis";
import { redisKeys } from "@/lib/redis-keys";



const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
    const refreshToken = req.cookies.get('fuellyRefreshToken')?.value

    try {
        if (refreshToken) {
            let sessionId: string | undefined

            try {
                const verified = await jwtVerify(refreshToken, JWT_SECRET)
                sessionId = verified.payload.jti

            } catch (error) {
                if (!(error instanceof errors.JOSEError)) {
                    throw error
                }

            }
            if (sessionId) {
                await redis.del(redisKeys.session(sessionId))
            }
        }


        const res = NextResponse.json({ success: true })



        res.cookies.set("fuellyRefreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 0,
        });

        return res
    } catch (error) {
        console.error("로그아웃 실패", error);

        return NextResponse.json(
            { success: false, message: "로그아웃 처리에 실패했습니다." },
            { status: 503 }
        );

    }

}