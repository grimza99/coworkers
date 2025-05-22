'use client';
import CalendarSelect from '@/components/calendar/CalendarSelect';
import { addDays, format, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
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

  const handleChangeDate = (value: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    setIsCalendarOpen(false);
    setCurrentDate(String(value));
    revalidateTasks();

    params.set('date', format(value, 'yyyy-MM-dd'));
    router.push(`?${params}`);
  };

  return (
    <div className="flex justify-between">
      <div className="relative flex items-center gap-3">
        <p className="text-lg-md">{format(currentDate, 'M월 dd일 (eee)', { locale: ko })}</p>
        <div className="flex gap-1">
          <button onClick={() => handleChangeDate(subDays(currentDate, 1))}>
            <Image src="/icons/prev-arrow-icon.svg" width={16} height={16} alt="<" />
          </button>
          <button onClick={() => handleChangeDate(addDays(currentDate, 1))}>
            <Image src="/icons/next-arrow-icon.svg" width={16} height={16} alt=">" />
          </button>
        </div>
        <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <Image src="/icons/calendar.svg" width={24} height={24} alt=">" />
        </button>
        {isCalendarOpen && (
          <div ref={ref} className="absolute top-10 z-100 w-80 md:top-0 md:-right-90 md:w-100">
            <CalendarSelect
              date={new Date(currentDate)}
              onDateChange={(value) => {
                handleChangeDate(value);
              }}
            />
          </div>
        )}
      </div>
      <CreateTaskListModal groupId={groupId} />
    </div>
  );
}
