import { NextRequest, NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import { jwtPayloadSchema } from '@/schemas/user/login/jwtpayload'
import { rotateRefreshToken } from "@/lib/auth/rotate-refresh-token";
import { randomUUID } from 'crypto'
import { hashToken } from '@/lib/hashToken'
import { encryptToken, decryptToken } from '@/lib/auth/encrypt-token'



const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const isProduction = process.env.NODE_ENV === "production";



export async function POST(req: NextRequest) {


    const refreshToken = req.cookies.get('fuellyRefreshToken')?.value
    const requestId = req.headers.get('Idempotency-Key')

    if (!requestId) {
        return NextResponse.json({ message: 'there is no requestId' }, { status: 400 })
    }

    if (!refreshToken) {
        console.error('refresh token not ')
        return NextResponse.json({ message: 'no refrsh token' }, { status: 401 })
    }

    let payload: { objectId: string }
    let sessionId: string
    let expiresAt: number

    try {

        const verified = await jwtVerify(refreshToken, JWT_SECRET)
        payload = jwtPayloadSchema.parse(verified.payload)

        if (!verified.payload.jti || !verified.payload.exp) {
            throw new Error('jwt id가 없습니다')
        }

        sessionId = verified.payload.jti
        expiresAt = verified.payload.exp
    } catch {
        return NextResponse.json({ message: 'not valid refreshtoken', success: false }, { status: 401 })
    }

    try {
        const newAccessToken = await new SignJWT({
            objectId: payload.objectId
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('10s')
            .setIssuedAt()
            .sign(JWT_SECRET)

        const newRefreshToken = await new SignJWT({
            objectId: payload.objectId,
            tokenId: randomUUID()
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(sessionId)
            .setExpirationTime(expiresAt)
            .setIssuedAt()
            .sign(JWT_SECRET)

        const res = await rotateRefreshToken(
            sessionId,
            payload.objectId,
            requestId,
            hashToken(refreshToken),
            hashToken(newRefreshToken),
            encryptToken(newRefreshToken)
        )


        if (res === "INVALID") {
            const response = NextResponse.json(
                { success: false, message: 'not valid session' },
                { status: 401 }
            )
            response.cookies.delete('fuellyRefreshToken')
            return response
        }

        if (res === 'INVALID' || res === 'user-mis') {
            const response = NextResponse.json(
                { success: false, message: 'not valid session' },
                { status: 401 }
            )
            response.cookies.delete('fuellyRefreshToken')
            return response
        }

        const finalRefreshToken = res === 'SUCCESS'
            ? newRefreshToken
            : decryptToken(res)

        const response = NextResponse.json({ success: true, accessToken: newAccessToken, message: '엑세스토큰 발급' })

        response.cookies.set('fuellyRefreshToken', finalRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            maxAge: Math.max(0, expiresAt - Math.floor(Date.now() / 1000))
        })
        return response
    } catch (err) {
        console.error('refreshtoken error', err)

        const res = NextResponse.json(
            { success: false, message: '리프레시토큰 유효하지 않다' },
            { status: 401 }
        )
        res.cookies.delete('fuellyRefreshToken')
        console.error('리프레시토큰 검중 실패')
        return res
    }
}