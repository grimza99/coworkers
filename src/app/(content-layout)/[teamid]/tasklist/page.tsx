'use client';

import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';
import Image from 'next/image';
import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';
import Button from '@/components/common/Button';
import DateWiseTaskList from './_tasklist/components/DateWiseTaskList';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleClickChangeDayIcon = (value: string) => {
    if (value === 'prev') {
      setCurrentDate((prev) => subDays(prev, 1));
    } else {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const handleClickCalendarPopUp = () => {
    // 캘린더 띄움
  };

  const handleClickCreateTask = () => {
    console.log('새로운 목록');
    //새로운 목록 모달 띄우기
  };

  const handleClickCreateTaskItem = () => {
    //할일 생성 모달 띄우기
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="text-lg-bold md:text-xl-bold">할일</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="text-lg-md">{format(currentDate, 'M월 dd일')}</p>
            <div className="flex gap-1">
              <button onClick={() => handleClickChangeDayIcon('prev')}>
                <Image src={prevIcon} width={16} height={16} alt="<" />
              </button>
              <button onClick={() => handleClickChangeDayIcon('next')}>
                <Image src={nextIcon} width={16} height={16} alt=">" />
              </button>
            </div>
            <button onClick={handleClickCalendarPopUp}>
              <Image src={calendar} width={24} height={24} alt=">" />
            </button>
          </div>
          <div onClick={handleClickCreateTask} className="text-primary text-md-rg">
            + 새로운 목록 추가하기
          </div>
        </div>
        <DateWiseTaskList date={currentDate} />
      </div>
      <Button
        className="absolute right-6 -bottom-20"
        onClick={handleClickCreateTaskItem}
        variant="solid"
        size="md"
        fontSize="16"
      >
        + 할 일 추가
      </Button>
    </>
  );
}
