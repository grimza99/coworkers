'use client';
import Image from 'next/image';
import profileIcon from '@/../public/icons/profile-icon.svg';
import Button from '@/components/common/Button';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { Member } from '@/types/user';

type MemberDetailModalProps = {
  modalId: string;
  member: Member;
};

export default function MemberDetailModal({ modalId, member }: MemberDetailModalProps) {
  const { userName, userImage, userEmail } = member;
  const { closeModal } = useModalContext();
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(userEmail);
  };

  return (
    <ModalPortal modalId={modalId}>
      <ModalOverlay modalId={modalId}>
        <ModalContainer>
          <div className="size-11.5">
            {userImage ? (
              <img src={userImage} className="rounded-full" />
            ) : (
              <Image
                width={24}
                height={24}
                src={profileIcon}
                alt="기본 프로필 이미지"
                className="size-full"
              />
            )}
          </div>
          <ModalHeading className="mt-4 mb-2">{userName}</ModalHeading>
          <ModalDescription className="text-xs-rg">{userEmail}</ModalDescription>
          <ModalFooter className="mt-6 w-70">
            <Button
              variant="solid"
              size="fullWidth"
              onClick={() => {
                copyEmailToClipboard();
                closeModal(modalId);
              }}
            >
              이메일 복사하기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
}
