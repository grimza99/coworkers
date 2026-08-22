import { NextRequest } from 'next/server';
import { getRequestCookie } from './cookie';

export const requestHeader = (request: NextRequest) => {
  const token = getRequestCookie(request);
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return header;
};
