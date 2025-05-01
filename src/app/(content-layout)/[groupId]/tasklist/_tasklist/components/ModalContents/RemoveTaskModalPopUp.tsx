'use client';
import { ModalPortal, ModalProvider, ModalTrigger } from '@/components/common/modal';
import { RemoveTaskModalContent } from './RemoveTaskModalContent';

interface Props {
  taskName: string;
}

export default function RemoveTaskModal({ taskName }: Props) {
  return (
    <ModalProvider>
      <ModalTrigger>삭제하기</ModalTrigger>
      <ModalPortal>
        <RemoveTaskModalContent taskName={taskName} />
      </ModalPortal>
    </ModalProvider>
  );
}
