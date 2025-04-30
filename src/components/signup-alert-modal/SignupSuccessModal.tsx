'use client';

import { useRouter } from 'next/navigation';
import {
  ModalCloseButton,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
} from '@/components/common/modal';
import Button from '../common/Button';

export default function SignupSuccessModal() {
  const router = useRouter();

  return (
    <div>
      <ModalOverlay>
        <ModalContainer className="h-[211px] w-[384px] px-6 py-5">
          <ModalCloseButton />
          <ModalHeading className="text-md-bold mb-2 text-white">회원가입 성공</ModalHeading>
          <ModalDescription className="text-gray300 text-sm">
            회원가입에 성공하셨습니다.
          </ModalDescription>
          <ModalFooter className="mt-6">
            <Button size="md" className="w-full" onClick={() => router.push('/login')}>
              로그인하러 가기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </div>
  );
}
