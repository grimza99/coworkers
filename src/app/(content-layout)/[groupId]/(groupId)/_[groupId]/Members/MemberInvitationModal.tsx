'use client';
import { getInvitationToken } from '@/api/group';
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
import { Toast } from '@/components/common/Toastify';
import { Group } from '@/types/group';

interface MemberInvitationModalProps {
  modalId: string;
  groupId: Group['id'];
}

// @TODO: '이메일로 초대' API 활용? /{teamId}/groups/{id}/member
export default function MemberInvitationModal({ modalId, groupId }: MemberInvitationModalProps) {
  const { closeModal } = useModalContext();

  const copyInvitationTokenToClipboard = async () => {
    try {
      const res = await getInvitationToken(groupId);
      const token = res.data;
      navigator.clipboard.writeText(token);
      Toast.success('멤버 초대 토큰 복사 완료');
    } catch {
      Toast.error('멤버 초대 토큰 복사 실패');
    }
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
              링크 복사하기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
}
