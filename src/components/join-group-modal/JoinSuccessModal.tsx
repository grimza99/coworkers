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
  groupName: string;
}

export default function JoinSuccessModal({ groupName }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/teams'); // Replace with your actual redirect path
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <ModalPortal modalId="join-success">
        <ModalOverlay modalId="join-success">
          <ModalContainer className="px-6 py-6">
            <img src="/icons/user.svg" alt="user-icon" width={24} height={24} className="pb-3" />
            <ModalHeading className="text-md-md mb-2 text-white">팀 참여 성공</ModalHeading>
            <ModalDescription className="text-lg-rg mb-6 w-full px-3">
              <span className="text-primary">{groupName}</span>그룹 참여에 성공하셨습니다. <br />
              5초 뒤 자동으로 팀페이지로 이동합니다.
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button
                  variant="solid"
                  size="fullWidth"
                  className="w-full"
                  onClick={() => router.push('/{groupId}')}
                >
                  팀 페이지로 이동
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
