'use client';
import { useState } from 'react';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
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
import { postMemberAction } from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/actions';
import { Toast } from '@/components/common/Toastify';
import { getInvitationToken } from '@/api/group';
import { Group } from '@/types/group';
import { validateEmail, validateEmptyValue } from '@/utils/validators';

interface MemberInvitationModalProps {
  modalId: string;
  groupId: Group['id'];
}

export default function MemberInvitationModal({ modalId, groupId }: MemberInvitationModalProps) {
  const { closeModal } = useModalContext();
  const [isTokenMethod, setIsTokenMethod] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addMember = async (email: string) => {
    postMemberAction(groupId, email);
  };

  return (
    <ModalPortal modalId={modalId}>
      <ModalOverlay modalId={modalId}>
        <ModalContainer>
          <ModalCloseButton modalId={modalId} />
          <ModalHeading className="mb-2">초대 링크 복사</ModalHeading>
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

          <ModalHeading className="mb-2">이메일로 멤버 추가</ModalHeading>
          <FormField
            field="input"
            placeholder="추가할 유저의 이메일을 입력해 주세요."
            isSuccess={!validateEmptyValue(email) && validateEmail(email)}
            isFailure={validateEmptyValue(email) || !validateEmail(email)}
            errorMessage="올바른 이메일을 입력해 주세요."
            value={email}
            onChange={handleChangeEmail}
            disabled={isLoading}
          />

          <Button
            variant="solid"
            size="fullWidth"
            onClick={() => {
              addMember(email);
              closeModal(modalId);
            }}
          >
            추가하기
          </Button>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
}
