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
import useModalContext from '@/components/common/modal/core/useModalContext';

export default function PasswordChangeSuccessModal() {
  const { closeModal } = useModalContext();

  return (
    <>
      <ModalPortal modalId="password-success">
        <ModalOverlay modalId="password-success">
          <ModalContainer className="px-6 py-6">
            <img src="/icons/user.svg" alt="user-icon" width={24} height={24} className="pb-3" />
            <ModalHeading className="text-md-md mb-2 text-white">비밀번호 변경 성공</ModalHeading>
            <ModalDescription className="text-lg-rg mb-5 w-full px-3">
              회원님의 비밀번호가 정상적으로 변경되었습니다.
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button
                  variant="solid"
                  size="fullWidth"
                  className="w-full"
                  onClick={() => closeModal('password-success')}
                >
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
