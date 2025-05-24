'use client';
import Image from 'next/image';
import kakaoIcon from '@/../public/icons/kakao-oauth-icon.svg';
import { useId } from 'react';

export default function OAuthButtonGroup() {
  const state = useId();
  return (
    <div className="flex gap-4">
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${state}`}
      >
        <Image src={kakaoIcon} width="40" height="40" alt="카카오톡" />
      </a>
    </div>
  );
}
