
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify} from 'jose'


const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET 
)

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  console.log('middleware실행')
  if (
    pathname === '/api/check-email' ||
    pathname === '/api/kakao-login' ||
    pathname === '/api/regular-login' ||
    pathname === '/api/register'
) {
    return NextResponse.next();
}
const header = req.headers.get('Authorization')
const accessToken = header?.split(' ')[1]
const refreshToken = req.cookies.get('refreshToken')?.value


if(!refreshToken){
  return NextResponse.redirect(new URL('/login', req.url))
}

if(!accessToken) {
  try{
    await jwtVerify(refreshToken, JWT_SECRET)
    console.log('엑세스토큰 검중~~~ From middleware ')
    return NextResponse.next()
  }catch(err){
    console.log('err', err)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
  // !엑세스토큰 검증
  try{
    await jwtVerify(accessToken, JWT_SECRET);
    console.log('엑세스토큰 검증 성공 From middleware')
    return NextResponse.next();
    
  }catch{
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
export const config = {
    matcher: ['/api/:path*',], 
  }
  //여기로 오는 것만 동작함