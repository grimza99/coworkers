import {
  ModalCloseButton,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
} from '@/components/common/modal';
import Button from '../common/Button';

export default function SignupFailModal() {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalCloseButton />
        <ModalHeading>회원 가입에 실패했습니다.</ModalHeading>
        <ModalDescription>버튼을 누르면 회원가입페이지로 다시 이동합니다.</ModalDescription>
        <ModalFooter>
          <Button size="sm" fontSize="16" variant="outline-gray">
            다시 시도하기
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
