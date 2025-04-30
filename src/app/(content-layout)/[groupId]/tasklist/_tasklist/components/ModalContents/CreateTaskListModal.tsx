'use client';
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
  ModalProvider,
  ModalTrigger,
} from '@/components/common/modal';
import { useState } from 'react';

export default function CreateTaskListModal() {
  const [currentValue, setCurrentValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value.trim());
  };
  const CreateTaskList = () => {};

  return (
    <ModalProvider>
      <ModalTrigger className="text-primary size-20 w-fit">+ 새로운 목록 추가하기</ModalTrigger>
      <ModalPortal>
        <ModalOverlay>
          <ModalContainer>
            <ModalCloseButton />
            <ModalHeading>새로운 목록 추가</ModalHeading>
            <ModalDescription className="text-md-md mb-6 w-full text-gray-500">
              할 일에 대한 목록을 추가하고
              <br />
              목록별 할 일을 만들 수 있습니다.
            </ModalDescription>
            <FormField
              label="목록 이름"
              field="input"
              required
              isSuccess={currentValue !== ''}
              isFailure={currentValue === ''}
              errorMessage="이름을 입력해 주세요."
              gapSize="32"
              labelSize="16/20"
              value={currentValue}
              onChange={handleChange}
            />
            <ModalFooter className="w-full">
              <Button onClick={CreateTaskList} fontSize="16" size="fullWidth">
                만들기
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </ModalProvider>
  );
}
