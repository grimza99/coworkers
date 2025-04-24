'use client';

import { useEffect, useState } from 'react';
import { formatDateToKorean } from '../hooks/format-date-to-korean';

import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.icon.svg';

import Image from 'next/image';

export default function HandleDate() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(formatDateToKorean(currentDate));
  }, [currentDate]);

  const ChangeDayIcon = (value: string) => {
    //날짜 변환 로직
  };

  const calendarPop = () => {
    // 캘린더 띄움
  };

  return (
    <div className="flex items-center gap-3">
      <p className="text-lg-md">{formattedDate}</p>
      <div className="flex gap-1">
        <button onClick={() => ChangeDayIcon('prev')}>
          <Image src={prevIcon} width={16} height={16} alt="<" />
        </button>
        <button onClick={() => ChangeDayIcon('next')}>
          <Image src={nextIcon} width={16} height={16} alt=">" />
        </button>
      </div>

      <button onClick={calendarPop}>
        <Image src={calendar} width={24} height={24} alt=">" />
      </button>
    </div>
  );
}
