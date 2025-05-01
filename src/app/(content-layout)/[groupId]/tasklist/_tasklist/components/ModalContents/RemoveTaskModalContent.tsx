'use client';
import Button from '@/components/common/Button';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import Image from 'next/image';

interface Props {
  name: string;
  id: number;
}

export function RemoveTaskModalContent({ name, id }: Props) {
  const { closeModal } = useModalContext();

  console.log(id);
  const handleClickDeleteTask = () => {};

  // if (!task) return;
  return (
    <ModalOverlay>
      <ModalContainer>
        <Image src="/icons/danger.icon.svg" alt="!" width={20} height={20} />
        <ModalHeading className="mt-4 mb-2">
          <p>{`'${name}'${(<br />)}할 일을 정말 삭제하시겠어요?`}</p>
        </ModalHeading>
        <ModalDescription className="text-md-md text-gray500 mb-6 w-full">
          삭제 후에는 되돌릴 수 없습니다.
        </ModalDescription>
        <ModalFooter className="w-full">
          <div className="flex w-full gap-2">
            <Button variant="outline-gray" onClick={closeModal} fontSize="16" size="fullWidth">
              닫기
            </Button>
            <Button variant="danger" onClick={handleClickDeleteTask} size="fullWidth">
              만들기
            </Button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
