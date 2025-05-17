'use client';
import { useState } from 'react';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import {
  ModalCloseButton,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import axiosClient from '@/lib/axiosClient';

interface Props {
  groupId: string;
}
export default function CreateTaskListModal({ groupId }: Props) {
  const [currentValue, setCurrentValue] = useState('');
  const { closeModal } = useModalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value.trim());
  };

  const handleSubmitCreateTaskList = async () => {
    await axiosClient.post(`/groups/${groupId}/task-lists`, { name: currentValue });
    closeModal('createTaskList');
  };

  return (
    <>
      <ModalTrigger className="text-primary w-fit" modalId="createTaskList">
        + 새로운 목록 추가하기
      </ModalTrigger>
      <ModalPortal modalId="createTaskList">
        <ModalOverlay modalId="createTaskList">
          <ModalContainer className="md:max-w-96">
            <ModalCloseButton modalId="createTaskList" />
            <div className="mb-6 w-full px-6">
              <ModalHeading className="mb-2">새로운 목록 추가</ModalHeading>
              <ModalDescription className="text-md-md text-gray500 mb-6 w-full">
                할 일에 대한 목록을 추가하고
                <br />
                목록별 할 일을 만들 수 있습니다.
              </ModalDescription>
              <FormField
                label="목록 이름"
                field="input"
                placeholder="목록 이름을 입력해주세요."
                required
                isSuccess={currentValue !== ''}
                isFailure={currentValue === ''}
                errorMessage="이름을 입력해 주세요."
                gapSize="32"
                labelSize="16/20"
                value={currentValue}
                onChange={handleChange}
              />
              <ModalFooter className="mt-6 w-full">
                <Button
                  onClick={handleSubmitCreateTaskList}
                  fontSize="16"
                  size="fullWidth"
                  disabled={currentValue === ''}
                >
                  만들기
                </Button>
              </ModalFooter>
            </div>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}
