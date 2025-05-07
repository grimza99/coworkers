'use client';
import Button from '@/components/common/Button';
import {
  ModalCloseButton,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import axiosClient from '@/lib/axiosClient';
import { Group } from '@/types/group';

interface MemberInvitationModalProps {
  modalId: string;
  groupId: Group['id'];
}

export default function MemberInvitationModal({ modalId, groupId }: MemberInvitationModalProps) {
  const { closeModal } = useModalContext();

  const copyInvitationTokenToClipboard = async () => {
    const res = await axiosClient.get(`/groups/${groupId}/invitation`);
    const token = res.data;
    navigator.clipboard.writeText(token);
  };

  return (
    <ModalPortal modalId={modalId}>
      <ModalOverlay modalId={modalId}>
        <ModalContainer>
          <ModalCloseButton modalId={modalId} />
          <ModalHeading className="mb-2">멤버 초대</ModalHeading>
          <ModalDescription>그룹에 참여할 수 있는 링크를 복사합니다.</ModalDescription>
          <ModalFooter className="mt-5 w-70">
            <Button
              variant="solid"
              size="fullWidth"
              onClick={() => {
                copyInvitationTokenToClipboard();
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
