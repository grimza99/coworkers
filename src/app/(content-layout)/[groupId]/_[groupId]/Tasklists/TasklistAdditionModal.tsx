'use client';
import { useState } from 'react';
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
import { isEmptyString } from '@/utils/validators';

interface Props {
  modalId: string;
  addTasklist: (name: string) => void;
}
export default function TasklistAdditionModal({ modalId, addTasklist }: Props) {
  const [name, setName] = useState('');
  const { closeModal } = useModalContext();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClickAddButton = async () => {
    if (isEmptyString(name)) return;
    addTasklist(name);
    closeModal(modalId);
  };

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer className="px-12 md:max-w-96 md:px-13">
            <ModalCloseButton modalId={modalId} />
            <div className="mb-6 w-full">
              <ModalHeading className="mb-2">할 일 목록 추가</ModalHeading>
              <FormField
                field="input"
                placeholder="목록 이름을 입력해주세요."
                isSuccess={!isEmptyString(name)}
                isFailure={isEmptyString(name)}
                errorMessage="이름을 입력해 주세요."
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <ModalFooter className="w-full">
              <Button onClick={handleClickAddButton} fontSize="16" size="fullWidth">
                만들기
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
