'use client';
import { useEffect, useState } from 'react';
import { Toast } from '@/components/common/Toastify';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import {
  ModalCloseButton,
  ModalContainer,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { validateEmptyValue } from '@/utils/validators';

interface TasklistCreateModalProps {
  modalId: string;
  isCreationLoading: boolean;
  errorOnCreate: { message: string; id: string } | null;
  createTasklist: (name: string) => void;
}

export default function TasklistCreateModal({
  modalId,
  isCreationLoading,
  errorOnCreate,
  createTasklist,
}: TasklistCreateModalProps) {
  const [name, setName] = useState('');
  const { closeModal } = useModalContext();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const clearName = () => {
    setName('');
  };

  const handleClickAddButton = async () => {
    if (validateEmptyValue(name)) return;
    createTasklist(name);
    clearName();
    closeModal(modalId);
  };

  useEffect(() => {
    if (!errorOnCreate) return;
    Toast.error(errorOnCreate.message);
  }, [errorOnCreate]);

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer className="px-12 md:max-w-96 md:px-13">
            <ModalCloseButton modalId={modalId} onClick={clearName} />
            <div className="mb-6 w-full">
              <ModalHeading className="mb-2">할 일 목록 추가</ModalHeading>
              <FormField
                field="input"
                placeholder="목록 이름을 입력해주세요."
                isSuccess={!validateEmptyValue(name)}
                isFailure={validateEmptyValue(name)}
                errorMessage="이름을 입력해 주세요."
                value={name}
                onChange={handleChangeName}
                disabled={isCreationLoading}
              />
            </div>
            <ModalFooter className="w-full">
              <Button onClick={handleClickAddButton} fontSize="16" size="fullWidth">
                {isCreationLoading ? '...' : '만들기'}
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
