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
} from '@/components/common/modal';
import { useState } from 'react';

export default function CreateTaskListModal() {
  const [currentValue, setCurrentValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value.trim());
  };
  const CreateTaskList = () => {};

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalCloseButton />
        <ModalHeading>새로운 목록 추가</ModalHeading>
        <ModalDescription className="mb-6 w-full">
          <div className="flex- flex-col gap-4">
            <p className="text-md-md text-gray-500">
              할 일에 대한 목록을 추가하고
              <br />
              목록별 할 일을 만들 수 있습니다.
            </p>
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
          </div>
        </ModalDescription>
        <ModalFooter className="w-full">
          <Button onClick={CreateTaskList} fontSize="16" size="fullWidth">
            만들기
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
