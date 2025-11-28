import {NextRequest, NextResponse} from 'next/server'
import { SignJWT, jwtVerify } from 'jose'


const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
  );


export default async function POST(req: NextRequest) {
    try{
    const refreshToken = req.cookies.get('refreshToken')?.value

    if(!refreshToken){
        return NextResponse.json({message: 'no refrsh token'},{status:401})
    }

    const verified = await jwtVerify(refreshToken, JWT_SECRET)
    const payload = verified.payload as { objectId: string, nickName: string }

    const newAccessToken = await new SignJWT({
        objectId: payload.objectId,
        nickName: payload.nickName
    })
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime('5m')
        .setIssuedAt()  
        .sign(JWT_SECRET)
        console.log('리프레시토큰 검중 ')
            return NextResponse.json({success: true, accessToken: newAccessToken, message:'엑세스토큰 발급'})
    }catch(err){
        console.log('refreshtoken error', err)

        const res = NextResponse.json(
            {success: false, message: '리프레시토큰 유효하지 않다'},
            {status: 401}
        )
        res.cookies.delete('refreshToken')
        console.log('리프레시토큰 검중 실패')
        return res
    }
}