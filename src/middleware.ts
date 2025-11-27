
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


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
    jwt.verify(refreshToken, process.env.JWT_SECRET!)
    return NextResponse.next()
  }catch(err){
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
  // !엑세스토큰 검증
  try{
    jwt.verify(accessToken, process.env.JWT_SECRET!, (err, user)=> {
      console.log('userfdasf', user)
    });
    return NextResponse.next();
    
  }catch{
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
export const config = {
    matcher: ['/api/:path*',], 
  }
  //여기로 오는 것만 동작함