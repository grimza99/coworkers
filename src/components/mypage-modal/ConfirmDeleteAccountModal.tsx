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
import useModalContext from '@/components/common/modal/core/useModalContext';
import axiosClient from '@/lib/axiosClient';
import { Toast } from '@/components/common/Toastify';

export default function ConfirmDeleteAccountModal() {
  const { closeModal, openModal } = useModalContext();

  return (
    <>
      <ModalPortal modalId="confirm-delete-account">
        <ModalOverlay modalId="confirm-delete-account">
          <ModalContainer>
            <Image src="/icons/danger.icon.svg" alt="!" width={24} height={24} className="m-4" />
            <ModalHeading className="text-lg-md w-full pb-2 text-white">
              정말 탈퇴 하시겠어요?
            </ModalHeading>
            <ModalDescription className="text-md-md w-84 px-3 pb-5">
              탈퇴 버튼 선택 시,
              <br />
              계정은 삭제되며 복구되지 않습니다.
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-70 gap-2">
                <Button
                  variant="outline-gray"
                  className="w-full"
                  size="fullWidth"
                  onClick={() => closeModal('confirm-delete-account')}
                >
                  돌아가기
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  size="fullWidth"
                  onClick={async () => {
                    try {
                      await axiosClient.delete('/user');
                      closeModal('confirm-delete-account');
                      Toast.success('회원 탈퇴가 완료되었습니다.');
                      window.location.href = '/';
                    } catch (error) {
                      Toast.error('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
                      closeModal('confirm-delete-account');
                    }
                  }}
                >
                  회원 탈퇴
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
