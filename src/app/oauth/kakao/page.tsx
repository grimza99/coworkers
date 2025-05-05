'use client';
import PATHS from '@/constants/paths';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthPage() {
  const searchParams = useSearchParams();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_IN;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const router = useRouter();

  const oauthRequest = async () => {
    const res = await axiosClient.post(`/auth/signIn/KAKAO`, {
      state: state,
      redirectUri: redirectUri,
      token: code,
    });

    if (res.status === 200) {
      setClientCookie('accessToken', res.data.accessToken);
      setClientCookie('refreshToken', res.data.refreshToken);
      router.push(PATHS.HOME);
    }
  };

  useEffect(() => {
    oauthRequest();
  }, []);
}
