'use client';
import ErrorModal from '@/components/common/ErrorModal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import PATHS from '@/constants/paths';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthPage() {
  const { openModal } = useModalContext();
  const searchParams = useSearchParams();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const router = useRouter();
  const modalId = 'kakao-OAuth';

  const oauthRequest = async () => {
    try {
      const res = await axiosClient.post(`/auth/signIn/KAKAO`, {
        state: state,
        redirectUri: redirectUri,
        token: code,
      });

      if (res.status && res.status === 200) {
        setClientCookie('accessToken', res.data.accessToken);
        setClientCookie('refreshToken', res.data.refreshToken);
        router.push(PATHS.HOME);
      }
    } catch {
      openModal(modalId);
    }
  };

  useEffect(() => {
    oauthRequest();
  }, []);

  return (
    <ErrorModal
      modalId={modalId}
      ButtonText="돌아가기"
      description="간편 로그인에 실패 했습니다."
      onClick={() => router.back()}
    />
  );
}
