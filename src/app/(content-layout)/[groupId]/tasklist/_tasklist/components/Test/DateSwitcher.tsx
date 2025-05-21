'use client';
import CalendarSelect from '@/components/calendar/CalendarSelect';
import { addDays, format, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import CreateTaskListModal from '../ModalContents/CreateTaskListModal';
import { useState } from 'react';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';
import { revalidateTasks } from '../../actions/task-api';

interface Props {
  groupId: string;
  taskListId: number;
}
export default function DateSwitcher({ groupId, taskListId }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    isOpen: isCalendarOpen,
    setIsOpen: setIsCalendarOpen,
    ref,
  } = useOutSideClickAutoClose(false);

  const handleClickChangeDayIcon = async (value: string) => {
    if (value === 'prev') {
      const newDate = subDays(currentDate, 1);
      setCurrentDate((prev) => subDays(prev, 1));
      await revalidateTasks(groupId, taskListId, newDate);
    } else {
      const newDate = addDays(currentDate, 1);
      setCurrentDate((prev) => addDays(prev, 1));
      await revalidateTasks(groupId, taskListId, newDate);
    }
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
              date={currentDate}
              onDateChange={(value) => {
                setCurrentDate(value);
                setIsCalendarOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <CreateTaskListModal groupId={groupId} />
    </div>
  );
}
