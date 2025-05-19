'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { Toast } from '@/components/common/Toastify';
import Button from '@/components/common/Button';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { Tasklist } from '@/types/tasklist';

interface TasklistDeleteModalProps {
  modalId: string;
  tasklist: Tasklist;
  isDeletionLoading: boolean;
  errorOnDelete: { message: string; id: string } | null;
  deleteTasklist: (tasklist: Tasklist) => void;
}

export default function TasklistDeleteModal({
  modalId,
  tasklist,
  isDeletionLoading,
  errorOnDelete,
  deleteTasklist,
}: TasklistDeleteModalProps) {
  const { name } = tasklist;
  const { closeModal } = useModalContext();

  const handleClickAddButton = async () => {
    deleteTasklist(tasklist);
    closeModal(modalId);
  };

  useEffect(() => {
    if (!errorOnDelete) return;
    Toast.error(errorOnDelete.message);
  }, [errorOnDelete]);

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer className="px-12 md:max-w-96 md:px-13">
            <Image
              src="/icons/danger.icon.svg"
              alt="경고"
              width={23}
              height={22}
              className="size-6"
            />
            <ModalHeading className="mt-4 mb-2">
              <span className="text-primary">{name}</span>할 일 목록을 정말 삭제하시겠어요?
            </ModalHeading>
            <ModalDescription>
              목록의 할 일도 모두 삭제되며, 삭제 후에는 되돌릴 수 없습니다.
            </ModalDescription>
            <ModalFooter className="w-full">
              <Button onClick={() => closeModal(modalId)} variant="outline-gray" size="fullWidth">
                닫기
              </Button>
              <Button
                onClick={handleClickAddButton}
                variant="danger"
                size="fullWidth"
                disabled={isDeletionLoading}
              >
                {isDeletionLoading ? '...' : '삭제하기'}
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
