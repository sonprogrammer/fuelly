
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'


const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (
    pathname === '/api/check-email' ||
    pathname === '/api/kakao-login' ||
    pathname === '/api/regular-login' ||
    pathname === '/api/register'
  ) {
    return NextResponse.next()
  }
  const header = req.headers.get('Authorization')
  const accessToken = header?.split(' ')[1]
  const refreshToken = req.cookies.get('refreshToken')?.value


  if (!refreshToken) {
    return NextResponse.json({ message: 'no refreshtoken' }, { status: 401 })
  }

  if (!accessToken) {
    try {
      await jwtVerify(refreshToken, JWT_SECRET)
      return NextResponse.next()
    } catch (err) {
      console.log('err', err)
      return NextResponse.json({ message: 'no erreerr' }, { status: 401 })
    }
  }
  // !엑세스토큰 검증
  try {
    await jwtVerify(accessToken, JWT_SECRET);
    return NextResponse.next();

  } catch {
    return NextResponse.next()
  }
}
export const config = {
  matcher: ['/api/:path*',],
}