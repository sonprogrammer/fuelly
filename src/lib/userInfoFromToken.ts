import {NextRequest} from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
  );
export async function userInfoFromToken(req: NextRequest){
    const header = req.headers.get('Authorization')
    if(!header || !header?.startsWith('Bearer ')) return null

    const token = header.split(' ')[1]
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload 
}


