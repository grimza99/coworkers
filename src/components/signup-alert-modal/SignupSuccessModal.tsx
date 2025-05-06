'use client';

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

interface Props {
  nickname: string;
}

export default function SignupSuccessModal({ nickname }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/teams'); // Replace with your actual redirect path
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <ModalPortal modalId="signup-success">
        <ModalOverlay modalId="signup-success">
          <ModalContainer>
            <p className="text-lg-md">Welcome 🎉</p>
            <ModalHeading className="text-md-bold mb-2 text-white">회원가입 성공</ModalHeading>
            <ModalDescription className="text-gray500 text-md-md mb-6 w-full">
              {nickname}님 회원가입에 성공하셨습니다. <br />
              5초 뒤 로그인됩니다.
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button variant="solid" className="w-full" onClick={() => router.push('/login')}>
                  로그인 페이지로 이동
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
