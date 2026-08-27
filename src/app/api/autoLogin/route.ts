import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
)


export async function POST() {
    try {
        const cookieStore = await cookies()

        const refreshToken = cookieStore.get('refreshToken')?.value

        if (!refreshToken) {
            return NextResponse.json({ message: 'no refreshToken' }, { status: 401 })
        }

        const { payload } = await jwtVerify(refreshToken, JWT_SECRET)

        const accessToken = await new SignJWT({
            objectId: payload.objectId,
            nickName: payload.nickName
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('5m')
            .setIssuedAt()
            .sign(JWT_SECRET)

        return NextResponse.json({success: true, accessToken})
    } catch {
        return NextResponse.json({message: 'invalid refreshToken'}, { status: 401})
    }
}