'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import dropDownIcon from '@/../public/icons/dropdown-icon.svg';
import taskListIcon from '@/../public/icons/tasklist-icon.svg';
import clsx from 'clsx';
import DropDownGroupsItem from './groups-item';
import Link from 'next/link';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];
const PROFILE_DROPDOWN_VALUE = ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'];
const RECURRING_DROPDOWN_VALUE = ['반복안함', '한번', '매일', '주 반복', '월 반복'];
const SORT_DROPDOWN_VALUE = ['최신순', '좋아요 많은순'];

type ArrayType = 'profile' | 'item' | 'recurring' | 'groupList' | 'sort';

interface DropDownProps {
  onClick: (value: string) => void;
  value: ArrayType;
  groupList?: Group[];
  openBtn?: ReactNode;
}

//기본 모달 (케밥,프로필 클릭시 나오는 )
export function DropDown({ onClick, openBtn, value, groupList }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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
    case 'sort':
      options = SORT_DROPDOWN_VALUE;
      break;
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
    <div className="h-fit w-fit" ref={ref}>
      <div className="h-fit w-fit cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        {value === 'item' ? (
          <Image src={kebabIcon} width={16} height={16} alt=":" />
        ) : (
          <div>{openBtn}</div>
        )}
      </div>

      {isOpen && (
        <div
          className={clsx(
            'bg-bg200 text-gray100 border-border z-100 cursor-pointer rounded-xl border-1',
            value === 'profile' && 'sm:text-md-rg md:text-lg-rg w-30 md:w-[135px]',
            value === 'item' && 'text-md-rg w-30',
            value === 'recurring' && 'text-md-rg w-[109px]',
            value === 'groupList' && 'text-lg-md max-h-[300px] w-[218px] px-4 py-4',
            value === 'sort' && 'sm:text-xs-rg md:text-md-rg sm:w-[94px] md:w-30'
          )}
        >
          {!groupList ? (
            <>
              {options?.map((option) => {
                return (
                  <li
                    className={clsx(
                      'hover:bg-bg100 flex items-center justify-center rounded-xl',
                      value === 'profile' && 'py-[14px]',
                      value === 'item' && 'py-3',
                      value === 'recurring' && 'py-3',
                      value === 'sort' && 'py-[13px]'
                    )}
                    onClick={handleClickOption}
                    key={option}
                  >
                    {option}
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {groupList.map((group) => {
                return <DropDownGroupsItem key={group.id} group={group} />;
              })}
              <Link href="/addteam">팀추가버튼시교체</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface SelectedDropDownProps {
  onClick?: (value: string) => void;
  value: ArrayType;
  groupList?: Group[];
  selected?: string;
}

//셀렉티드 모달 (최신-좋아요순 정렬 / 헤더의 태스크 드롭다운 / 반복일정)
export function SelectedDropDown({ onClick, value, groupList, selected }: SelectedDropDownProps) {
  const defaultValue =
    value === 'recurring'
      ? RECURRING_DROPDOWN_VALUE[0]
      : value === 'sort'
        ? SORT_DROPDOWN_VALUE[0]
        : groupList![0].name;

  const [currentSelected, setCurrentSelected] = useState(selected ?? defaultValue);

  const handleClickOption = (targetText: string) => {
    setCurrentSelected(targetText);
    if (!onClick) return;
    onClick(targetText);
  };

  return (
    <>
      <DropDown
        openBtn={
          <div
            className={clsx(
              'text-gray100 flex items-center rounded-xl',
              value === 'recurring' &&
                'bg-bg400 text-gray500 h-11 w-[109px] justify-between px-3 py-[10px]',
              value === 'groupList' && 'h-fit w-fit gap-[11px]',
              value === 'sort' &&
                'sm:text-xs-rg md:text-md-rg bg-bg200 justify-between px-2 py-2 sm:h-10 sm:w-[94px] md:h-11 md:w-30'
            )}
          >
            <p
              className={clsx(
                value === 'groupList' && 'w-[110px] truncate overflow-hidden whitespace-nowrap'
              )}
            >
              {currentSelected}
            </p>
            {value !== 'groupList' ? (
              <Image width={24} height={24} src={dropDownIcon} alt="\/" />
            ) : (
              <Image width={16} height={16} alt="^" src={taskListIcon} />
            )}
          </div>
        }
        onClick={handleClickOption}
        value={value}
        groupList={groupList}
      />
    </>
  );
}
