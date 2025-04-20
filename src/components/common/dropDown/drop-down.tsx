'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import clsx from 'clsx';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];
const PROFILE_DROPDOWN_VALUE = ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'];
const RECURRING_DROPDOWN_VALUE = ['반복안함', '한번', '매일', '주 반복', '월 반복'];
const SORT_DROPDOWN_VALUE = ['최신순', '좋아요 많은순'];

type ArrayType = 'profile' | 'item' | 'recurring' | 'taskList' | 'sort';

interface DropDownProps {
  onClick: (value: string) => void;
  value: ArrayType;
  taskList?: string[];
  openBtn?: ReactNode;
}

//기본 모달 (케밥,프로필 클릭시 나오는 )
export function DropDown({ onClick, openBtn, value, taskList }: DropDownProps) {
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
      options = taskList;
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
        <ul
          className={clsx(
            'bg-bg200 text-gray100 rounded-xl border-1',
            value === 'profile' && 'h-40 w-30 md:h-[184px] md:w-[135px]',
            value === 'item' && 'h-20 w-30',
            value === 'recurring' && '',
            value === 'taskList' && '',
            value === 'sort' && ''
          )}
          ref={ref}
        >
          {options?.map((option) => {
            return (
              <li className="cursor-pointer" onClick={handleClickOption} key={option}>
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
  onClick: (value: string) => void;
  value: ArrayType;
  taskList?: string[];
  selected?: string;
}

//셀렉티드 모달 (최신-좋아요순 정렬 / 헤더의 태스크 드롭다운 / 반복일정)
export function SelectedDropDown({ onClick, value, taskList, selected }: SelectedDropDownProps) {
  const defaultValue =
    value === 'recurring'
      ? RECURRING_DROPDOWN_VALUE[0]
      : value === 'sort'
        ? SORT_DROPDOWN_VALUE[0]
        : taskList![0];

  const [currentSelected, setCurrentSelected] = useState(selected ?? defaultValue);

  const handleClickOption = (targetText: string) => {
    setCurrentSelected(targetText);
    onClick(targetText);
  };

  return (
    <>
      <DropDown
        openBtn={<div className="cursor-pointer">{currentSelected}</div>}
        onClick={handleClickOption}
        value={value}
        taskList={taskList}
      />
    </>
  );
}
