'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];
const PROFILE_DROPDOWN_VALUE = ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'];
const RECURRING_DROPDOWN_VALUE = ['한번', '매일', '주 반복', '월 반복'];
const SORT_DROPDOWN_VALUE = ['최신순', '좋아요 많은순'];

type ArrayType = 'profile' | 'item' | 'recurring' | 'taskList' | 'sort';

interface DropDownProps {
  onClick: (value: string) => void;
  value: ArrayType;
  taskOptions?: string[];
  openBtn?: ReactNode;
}

//기본 모달 (케밥,프로필 클릭시 나오는 )
export function DropDown({ onClick, openBtn, value, taskOptions }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
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
    case 'sort':
      options = SORT_DROPDOWN_VALUE;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleClickOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const targetText = event.currentTarget.textContent!;
    onClick(targetText);
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {value === 'item' ? (
          <Image src={kebabIcon} width={2} height={8} alt=":" />
        ) : (
          <div>{openBtn}</div>
        )}
      </div>

      {isOpen && (
        <ul ref={ref}>
          {options?.map((option) => {
            return (
              <li
                className="h-[50px] w-[200px] cursor-pointer text-red-500"
                onClick={handleClickOption}
                key={option}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

interface SelectedDropDownProps {
  onClick: () => void;
  value: ArrayType;
  taskOptions: string[];
  selected: string;
}

//셀렉티드 모달 (최신-좋아요순 정렬 / 헤더의 태스크 드롭다운 / 반복일정)
export function SelectedDropDown({ onClick, value, taskOptions, selected }: SelectedDropDownProps) {
  const [currentSelected, setCurrentSelected] = useState(selected ?? '');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOption = () => {
    setCurrentSelected(value);
    onClick;
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DropDown
        openBtn={
          <div className="cursor-pointer" onClick={handleClickOpen}>
            {currentSelected}
          </div>
        }
        onClose={handleClickClose}
        onClick={handleClickOption}
        isOpen={isOpen}
        value={value}
        taskOptions={taskOptions}
      />
    </>
  );
}
