'use client';
import { useEffect } from 'react';
import { Toast } from '@/components/common/Toastify';
import Button from '@/components/common/Button';
import {
  ModalCloseButton,
  ModalContainer,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';

interface TasklistDeleteModalProps {
  modalId: string;
  isDeletionLoading: boolean;
  errorOnDelete: { message: string; id: string } | null;
  deleteTasklist: () => void;
}

export default function TasklistDeleteModal({
  modalId,
  isDeletionLoading,
  errorOnDelete,
  deleteTasklist,
}: TasklistDeleteModalProps) {
  const { closeModal } = useModalContext();

  const handleClickAddButton = async () => {
    deleteTasklist();
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
            <ModalCloseButton modalId={modalId} />
            <div className="mb-6 w-full">
              <ModalHeading className="mb-2">할 일 목록 추가</ModalHeading>
            </div>
            <ModalFooter className="w-full">
              <Button onClick={handleClickAddButton} fontSize="16" size="fullWidth">
                {isDeletionLoading ? '...' : '만들기'}
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
