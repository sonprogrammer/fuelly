import { NextRequest, NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import { jwtPayloadSchema } from '@/schemas/user/login/jwtpayload'


const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
)


export async function POST(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get('fuellyRefreshToken')?.value

        if (!refreshToken) {
            console.error('refresh token not ')
            return NextResponse.json({ message: 'no refrsh token' }, { status: 401 })
        }

        const verified = await jwtVerify(refreshToken, JWT_SECRET)
        const payload = jwtPayloadSchema.parse(verified.payload)

        const newAccessToken = await new SignJWT({
            objectId: payload.objectId,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('5m')
            .setIssuedAt()
            .sign(JWT_SECRET)

        return NextResponse.json({ success: true, accessToken: newAccessToken, message: '엑세스토큰 발급' })
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