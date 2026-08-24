'use client';

import { loginApiResponse } from '@/app/(form-layout)/login/_login/LoginForm';
import BouncingDots from '@/components/common/loading/BouncingDots';
import { Toast } from '@/components/common/Toastify';
import { BFF_API } from '@/constants/api';
import PATHS from '@/constants/paths';
import axiosClient from '@/lib/axiosClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export default function OAuthClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFetched = useRef(false);

  const oauthRequest = useCallback(async () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!code || isFetched.current) return;

    isFetched.current = true;

    window.history.replaceState({}, '', '/oauth/kakao');
    try {
      await axiosClient.post<loginApiResponse>(BFF_API.auth.kakao_oauth, {
        state: state,
        redirectUri: redirectUri,
        token: code,
      });

      const { data } = await axiosClient.get(BFF_API.user);
      if (data.memberships.length < 1) {
        router.push(PATHS.NOGROUP);
      } else {
        router.push(`/${data.memberships[0].group.id}`);
      }
    } catch (error) {
      Toast.error('로그인 실패');
      router.push(PATHS.LOGIN);
    }
  }, [searchParams, router]);

  useEffect(() => {
    oauthRequest();
  }, [oauthRequest]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <BouncingDots />
    </div>
  );
}
