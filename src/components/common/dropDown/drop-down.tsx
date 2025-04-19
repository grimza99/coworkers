'use client';

import { useState } from 'react';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];
const PROFILE_DROPDOWN_VALUE = ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'];
const RECURRING_DROPDOWN_VALUE = ['한번', '매일', '주 반복', '월 반복'];

type ArrayType = 'profile' | 'item' | 'recurring' | 'taskList';

interface DropDownProps {
  onClick: (value: string) => void;
  isOpen?: boolean;
  value: ArrayType;
  taskOptions?: string[];
}

export function DropDown({ onClick, isOpen, value, taskOptions }: DropDownProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(isOpen);
  let options;

  switch (value) {
    case 'profile':
      options = PROFILE_DROPDOWN_VALUE;
      break;
    case 'item':
      options = ITEM_DROPDOWN_VALUE;
      break;
    case 'recurring':
      options = RECURRING_DROPDOWN_VALUE;
      break;
    case 'taskList':
      options = taskOptions;
      break;
  }

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const targetText = event.currentTarget.textContent!;
    setIsDropDownOpen(false);
    onClick(targetText);
  };

  return (
    <>
      {isDropDownOpen && (
        <ul>
          {options?.map((option) => {
            return (
              <li className="h-[50px] w-[200px] text-red-500" onClick={handleClick} key={option}>
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

interface SelectedDropDownProps extends DropDownProps {
  selected?: string;
}

export function SelectedDropDown({ onClick, value, taskOptions, selected }: SelectedDropDownProps) {
  const [currentSelected, setCurrentSelected] = useState(selected ?? '');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{currentSelected}</div>
      <DropDown
        onClick={() => {
          setCurrentSelected(value);
          onClick;
        }}
        isOpen={isOpen}
        value={value}
        taskOptions={taskOptions}
      />
    </>
  );
}
