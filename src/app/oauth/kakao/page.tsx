'use client';
import axiosClient from '@/lib/axiosClient';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthPage() {
  const searchParams = useSearchParams();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_IN;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const oauthRequest = async () => {
    await axiosClient.post(`/auth/signIn/KAKAO`, {
      state: state,
      redirectUri: redirectUri,
      token: code,
    });
  };

  useEffect(() => {
    oauthRequest();
  }, []);
}
