//폴더 최상위에 넣기

import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export function middleware(req: NextRequest) {
  console.log('middleware 실행됨!')
  const refreshToken = req.cookies.get('refreshToken')?.value
  console.log('refre', refreshToken)

  if(!refreshToken){
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET!)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url))
    //현재 도메인을 기준으로 /login 경로를 가진 URL을 생성해라
  }
}
export const config = {
    matcher: ['/home/:path*', '/mypage/:path*',], 
  }
  //여기서만동작함