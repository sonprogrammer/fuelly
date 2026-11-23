import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
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
                if (verified.payload.jti) {
                    const deleted = await redis.del(redisKeys.session(verified.payload.jti));
                    console.log("redis 세션 삭제 ", deleted);
                }

            } catch (error) {
                if (!(error instanceof Error) || error.name === 'UpstashError') {
                    throw error
                }

            }
            if (sessionId) {
                await redis.del(redisKeys.session(sessionId))
            }
        }


        const response = NextResponse.json({ success: true })



        response.cookies.set("fuellyRefreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 0,
        });

        return response
    } catch (error) {
        console.error("로그아웃 실패", error);

        return NextResponse.json(
            { success: false, message: "로그아웃 처리에 실패했습니다." },
            { status: 503 }
        );

    }

}