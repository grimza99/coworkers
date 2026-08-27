import { BACKEND_API } from '@/constants/api';
import { AuthApiResponse } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(BACKEND_API.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('백엔드 인증 실패 상태코드:', res.status);
      return NextResponse.json({ error: 'Failed to authenticate' }, { status: res.status });
    }

    const data = (await res.json()) as AuthApiResponse;

    const response = NextResponse.json(data, { status: 200 });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('accessToken', data.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 2, // 2시간
    });

    response.cookies.set('refreshToken', data.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7, // 7일
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
