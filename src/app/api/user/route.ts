import { BACKEND_API } from '@/constants/api';
import { getRequestCookie } from '@/lib/api/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = getRequestCookie(request);

    const res = await fetch(BACKEND_API.user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Fetch failed' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('User Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
