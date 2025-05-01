'use client';

import {
  ModalCloseButton,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import Button from '../common/Button';

export default function SignupFailModal() {
  return (
    <div>
      <ModalPortal>
        <ModalOverlay>
          <ModalContainer className="h-[211px] w-[384px] px-6 py-5">
            <ModalCloseButton />
            <ModalHeading className="text-md-bold mb-2 text-white">회원가입 실패</ModalHeading>
            <ModalDescription className="text-gray300 text-sm">
              회원가입 도중 문제가 발생했습니다. <br />
              다시 시도해주세요.
            </ModalDescription>
            <ModalFooter className="mt-6">
              <Button
                size="md"
                variant="outline-gray"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                다시 시도하기
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </div>
  );
}
