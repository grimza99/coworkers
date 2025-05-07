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
  onClose: () => void;
}

export default function NicknameChangeSuccessModal({ nickname, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/mypage');
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, onClose]);

  return (
    <>
      <ModalPortal modalId="signup-success">
        <ModalOverlay modalId="signup-success">
          <ModalContainer className="px-6 py-6">
            <img src="/icons/user.svg" alt="user-icon" width={24} height={24} className="pb-3" />
            <ModalHeading className="text-md-md mb-2 text-white">닉네임 변경 성공</ModalHeading>
            <ModalDescription className="text-lg-rg mb-6 w-full px-3">
              닉네임이<span className="text-primary">{nickname}</span>으로 변경에 성공하셨습니다.{' '}
              <br />
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button variant="solid" size="fullWidth" className="w-full" onClick={onClose}>
                  닫기
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
