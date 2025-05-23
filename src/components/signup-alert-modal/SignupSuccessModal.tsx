'use client';

import Image from 'next/image';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import Button from '../common/Button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserApiResponse } from '@/types/user';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { Toast } from '../common/Toastify';

interface Props {
  nickname: string;
}

export default function SignupSuccessModal({ nickname }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const loginRes = await axiosClient.post(`/auth/signIn`, {
          email,
          password,
        });

        const { accessToken, refreshToken } = loginRes.data;

        setClientCookie('accessToken', accessToken);
        setClientCookie('refreshToken', refreshToken);

        const userRes = await axiosClient.get(`/user`);
        const user: getUserApiResponse = userRes.data;
        console.log('로그인된 유저의 groupId:', user.memberships?.[0]?.groupId);

        router.push('/nogroup');
      } catch {
        Toast.error('자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.');
        router.push('/login');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ModalPortal modalId="signup-success">
      <ModalOverlay modalId="signup-success">
        <ModalContainer className="pr-4 pb-8 pl-4">
          <Image src="/icons/hello.svg" alt="user-icon" width={24} height={24} className="pb-3" />
          <ModalHeading className="text-md-md mb-2 text-white">회원가입 성공</ModalHeading>
          <ModalDescription className="text-lg-rg mb-6 w-60">
            <span className="text-primary">{nickname}</span> 님, 반가워요! <br />
            5초 뒤 자동으로 로그인됩니다.
          </ModalDescription>
          <ModalFooter className="w-full">
            <Button
              variant="solid"
              size="fullWidth"
              className="w-full"
              onClick={() => router.push('/login')}
            >
              로그인 페이지로 이동
            </Button>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
}
