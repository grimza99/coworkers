'use client';
import { ModalPortal, ModalTrigger } from '@/components/common/modal';
import { RemoveTaskModalContent } from './RemoveTaskModalContent';

interface Props {
  name: string;
  id: number;
}

export default function RemoveTaskModal({ name, id }: Props) {
  // console.log(task);
  // if (!task) return;
  return (
    <>
      <ModalTrigger>삭제하기</ModalTrigger>
      <ModalPortal>
        <RemoveTaskModalContent name={name} id={id} />
      </ModalPortal>
    </>
  );
}
