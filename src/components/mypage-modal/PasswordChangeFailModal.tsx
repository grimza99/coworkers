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

export default function PasswordChangeFailModal() {
  const { closeModal } = useModalContext();

  return (
    <>
      <ModalPortal modalId="password-fail">
        <ModalOverlay modalId="password-fail">
          <ModalContainer>
            <img src="/icons/danger.icon.svg" alt="!" width={24} height={24} className="pb-3" />
            <ModalHeading className="text-md-md mb-2 text-white">비밀번호 변경 실패</ModalHeading>
            <ModalDescription className="text-gray500 text-lg-rg mb-5 w-full px-3">
              비밀번호 변경 도중 문제가 발생했습니다. <br />
              다시 시도해주세요.
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button
                  variant="outline-gray"
                  className="w-full"
                  size="fullWidth"
                  onClick={() => closeModal('password-fail')}
                >
                  다시 시도하기
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
