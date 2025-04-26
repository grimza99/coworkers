'use client';

import { useState } from 'react';

import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';

import Image from 'next/image';
import { addDays, format, subDays } from 'date-fns';

export default function HandleDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDateToKorean = format(currentDate, 'M월 dd일');

  const handleClickChangeDayIcon = (value: string) => {
    if (value === 'prev') {
      setCurrentDate((prev) => subDays(prev, 1));
    } else {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const calendarPop = () => {
    // 캘린더 띄움
  };

  return (
    <div className="flex items-center gap-3">
      <p className="text-lg-md">{formattedDateToKorean}</p>
      <div className="flex gap-1">
        <button onClick={() => handleClickChangeDayIcon('prev')}>
          <Image src={prevIcon} width={16} height={16} alt="<" />
        </button>
        <button onClick={() => handleClickChangeDayIcon('next')}>
          <Image src={nextIcon} width={16} height={16} alt=">" />
        </button>
      </div>

      <button onClick={calendarPop}>
        <Image src={calendar} width={24} height={24} alt=">" />
      </button>
    </div>
  );
}
