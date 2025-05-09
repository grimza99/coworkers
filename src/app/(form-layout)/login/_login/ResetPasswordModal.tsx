'use client';
import { useState, useTransition } from 'react';
import Button from '@/components/common/Button';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import axiosClient from '@/lib/axiosClient';
import Input from '@/components/common/formField/compound/Input';

const redirectUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD;
//버튼 사이즈 custom하기

export default function ResetPasswordModal() {
  const { closeModal } = useModalContext();
  const modalId = `resetPassword`;

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [isPending, startTransition] = useTransition();

  const sendResetPasswordLink = () => {
    startTransition(async () => {
      try {
        const res = await axiosClient.post(`/user/send-reset-password-email`, {
          email: email,
          redirectUrl: redirectUrl,
        });
        if (res.status === 200) {
          setEmail('');
          closeModal(modalId);
        }
      } catch (error) {
        //input 에러처리
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  return (
    <>
      <ModalTrigger
        className="text-md-md text-primary mt-3 w-fit self-end underline"
        modalId={modalId}
        type="button"
      >
        비밀번호를 잊으셨나요?
      </ModalTrigger>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer className="md:w-full md:max-w-96">
            <div className="mb-6 w-full">
              <ModalHeading className="mb-2">비밀번호 재설정</ModalHeading>
              <ModalDescription className="text-md-md text-gray500 mb-6 w-full">
                비밀번호 재설정 링크를 보내드립니다.
              </ModalDescription>
              <Input
                placeholder="가입하신 이메일을 입력하세요"
                required
                value={email}
                onChange={handleChange}
                name="email"
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
            <ModalFooter className="flex w-full gap-2">
              <Button
                size="fullWidth"
                variant="outline-primary"
                onClick={() => closeModal(modalId)}
              >
                닫기
              </Button>
              <Button
                size="fullWidth"
                variant="solid"
                disabled={isPending}
                onClick={sendResetPasswordLink}
              >
                링크 보내기
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
