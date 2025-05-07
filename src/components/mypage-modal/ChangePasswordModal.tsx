'use client';

import {
  ModalContainer,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import Button from '../common/Button';
import useModalContext from '@/components/common/modal/core/useModalContext';
import FormField from '../common/formField';

export default function ChangePasswordModal() {
  const { closeModal } = useModalContext();

  return (
    <>
      <ModalPortal modalId="change-password">
        <ModalOverlay modalId="change-password">
          <ModalContainer className="px-6 py-6">
            <ModalHeading className="text-lg-md p-4">비밀번호 변경하기</ModalHeading>
            <div className="mx-6 w-70">
              <div className="flex flex-col gap-4">
                <FormField
                  field="input"
                  label="새 비밀번호"
                  placeholder="새 비밀번호를 입력해주세요."
                />
                <FormField
                  field="input"
                  label="새 비밀번호 확인"
                  placeholder="새 비밀번호를 다시 한 번 입력해주세요."
                />
              </div>
              <ModalFooter className="mt-6 w-full">
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline-primary"
                    size="fullWidth"
                    className="w-full"
                    onClick={() => closeModal('change-password')}
                  >
                    닫기
                  </Button>

                  <Button
                    variant="solid"
                    size="fullWidth"
                    className="w-full"
                    onClick={() => closeModal('change-password')}
                  >
                    변경하기
                  </Button>
                </div>
              </ModalFooter>
            </div>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
