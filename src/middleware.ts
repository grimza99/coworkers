import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  const isPublicPath = ['/', '/login', '/signup'].includes(pathname);
  const isStaticAsset = // 정적 리소스 요청 (JS, CSS, 이미지 등)
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons');

  if (isStaticAsset) {
    // 정적 파일 요청은 인증 검사 없이 그대로 허용
    return NextResponse.next();
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // 모든 경로에 미들웨어 적용
};
