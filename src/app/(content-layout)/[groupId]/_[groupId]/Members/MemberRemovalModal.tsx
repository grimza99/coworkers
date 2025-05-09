'use client';
import Image from 'next/image';
import dangerIcon from '@/../public/icons/danger.icon.svg';
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
import axiosClient from '@/lib/axiosClient';
import { Member } from '@/types/user';

type MemberRemovalModalProps = {
  modalId: string;
  member: Member;
};

export default function MemberRemovalModal({ modalId, member }: MemberRemovalModalProps) {
  const { userId, userName, groupId } = member;
  const { closeModal } = useModalContext();
  const removeMember = () => {
    // @TODO: 삭제 후 UI 처리
    axiosClient.delete(`/groups/${groupId}/member/${userId}`);
  };

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer>
            <Image src={dangerIcon} alt="경고" width={23} height={22} className="size-6" />
            <ModalHeading className="mt-4 mb-2">
              <span className="text-primary">{userName}</span> 님을 그룹에서 내보내시겠어요?
            </ModalHeading>
            <ModalDescription>내보낸 멤버는 다시 초대할 수 있습니다.</ModalDescription>
            <ModalFooter className="mt-6 w-70">
              <Button variant="outline-gray" size="fullWidth" onClick={() => closeModal(modalId)}>
                닫기
              </Button>
              <Button
                variant="danger"
                size="fullWidth"
                onClick={() => {
                  removeMember();
                  closeModal(modalId);
                }}
              >
                내보내기
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
