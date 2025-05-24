'use client';

import { loginApiResponse } from '@/app/(form-layout)/login/_login/LoginForm';
import BouncingDots from '@/components/common/loading/BouncingDots';
import { Toast } from '@/components/common/Toastify';
import PATHS from '@/constants/paths';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function OAuthClient() {
  const searchParams = useSearchParams();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const router = useRouter();

  const oauthRequest = useCallback(async () => {
    try {
      const res = await axiosClient.post<loginApiResponse>(`/auth/signIn/KAKAO`, {
        state: state,
        redirectUri: redirectUri,
        token: code,
      });

      if (res.status && res.status === 200) {
        setClientCookie('accessToken', res.data.accessToken);
        setClientCookie('refreshToken', res.data.refreshToken);
      }

      const { data } = await axiosClient.get(`/user`);
      if (data.memberships.length < 1) {
        router.push(PATHS.NOGROUP);
      } else {
        router.push(`/${data.memberships[0].group.id}`);
      }
    } catch {
      Toast.error('로그인 실패');
      router.push(PATHS.LOGIN);
    }
  }, [code, redirectUri, router, state]);

  useEffect(() => {
    oauthRequest();
  }, [oauthRequest]);

  return (
    <div className="flex h-full w-full items-center justify-center pt-100">
      <BouncingDots />
    </div>
  );
}
