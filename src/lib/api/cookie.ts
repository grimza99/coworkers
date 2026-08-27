import { NextRequest, NextResponse } from 'next/server';

export const getRequestCookie = (request: NextRequest) => {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return token;
};
