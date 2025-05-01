'use client';
import { ModalPortal, ModalProvider, ModalTrigger } from '@/components/common/modal';
import { RemoveTaskModalContent } from './RemoveTaskModalContent';

interface Props {
  taskName: string;
}

export default function RemoveTaskModal({ taskName }: Props) {
  return (
    <ModalProvider>
      <ModalTrigger modalId="1">삭제하기</ModalTrigger>
      <ModalPortal modalId="1">
        <RemoveTaskModalContent taskName={taskName} />
      </ModalPortal>
    </ModalProvider>
  );
}
