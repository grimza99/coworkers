import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
} from '@/components/common/modal';
import Button from '../common/Button';
import Image from 'next/image';

export default function DeleteAccountModal() {
  return (
    <ModalContainer>
      <Image src="/icons/danger.svg" width={24} height={24} alt="경고 아이콘" />
      <ModalHeading>회원 탈퇴를 진행하시겠어요?</ModalHeading>
      <ModalDescription>
        그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다.
      </ModalDescription>
      <ModalFooter>
        <Button size="sm" fontSize="16" variant="outline-gray">
          닫기
        </Button>
        <Button size="sm" fontSize="16" variant="danger">
          회원 탈퇴
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}
