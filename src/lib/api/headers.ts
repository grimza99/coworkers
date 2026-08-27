import { NextRequest } from 'next/server';
import { getRequestCookie } from './cookie';

type TContentType = 'application/json' | 'multipart/form-data';

export const requestHeader = (
  request: NextRequest,
  contentType: TContentType = 'application/json'
): Record<string, string> => {
  const token = getRequestCookie(request);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (contentType !== 'multipart/form-data') {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};
