'use client';
import CalendarSelect from '@/components/calendar/CalendarSelect';
import { addDays, format, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { revalidateTasks } from '../actions/task-actions';
import CreateTaskListModal from './ModalContents/CreateTaskListModal';

interface Props {
  groupId: string;
  date: string;
}
export default function DateSwitcher({ groupId, date }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(date);
  const {
    isOpen: isCalendarOpen,
    setIsOpen: setIsCalendarOpen,
    ref,
  } = useOutSideClickAutoClose(false);

  const handleClickChangeDayIcon = (direction: 'prev' | 'next') => {
    const params = new URLSearchParams(searchParams.toString());
    const newDate = direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1);

    setCurrentDate(String(newDate));
    revalidateTasks();

    params.set('date', String(newDate));
    router.push(`?${params.toString()}`);
  };

  const selectDateOnCalendar = (value: Date) => {
    const params = new URLSearchParams(searchParams.toString());

    setIsCalendarOpen(false);
    setCurrentDate(String(value));
    revalidateTasks();

    params.set('date', String(value));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between">
      <div className="relative flex items-center gap-3">
        <p className="text-lg-md">{format(currentDate, 'M월 dd일 (eee)', { locale: ko })}</p>
        <div className="flex gap-1">
          <button onClick={() => handleClickChangeDayIcon('prev')}>
            <Image src={prevIcon} width={16} height={16} alt="<" />
          </button>
          <button onClick={() => handleClickChangeDayIcon('next')}>
            <Image src={nextIcon} width={16} height={16} alt=">" />
          </button>
        </div>
        <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <Image src={calendar} width={24} height={24} alt=">" />
        </button>
        {isCalendarOpen && (
          <div ref={ref} className="absolute top-10 z-100 w-80 md:top-0 md:-right-90 md:w-100">
            <CalendarSelect
              date={new Date(currentDate)}
              onDateChange={(value) => {
                selectDateOnCalendar(value);
              }}
            />
          </div>
        )}
      </div>
      <CreateTaskListModal groupId={groupId} />
    </div>
  );
}
