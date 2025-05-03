'use client';

import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';
import Image from 'next/image';
import { addDays, format, subDays } from 'date-fns';
import { use, useState } from 'react';
import DateWiseTaskList from './_tasklist/components/DateWiseTaskLists';
import CreateTaskListModal from './_tasklist/components/ModalContents/CreateTaskListModal';
import { ko } from 'date-fns/locale';
import CalendarSelect from '@/components/calendar/CalendarSelect';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import ManageTaskItemModal from './_tasklist/components/manage-task-item-modal/MangeTaskItemModal';

interface Props {
  params: Promise<{ groupId: string }>;
}

/*
 * @Todo
 * 1. 할일추가 버튼으로 할일 생성 모달 띄우기 -> 할일 생성 리퀘스트
 * 2. repeat, 매일반복부분 팀미팅 후 수정
 */
export default function Page({ params }: Props) {
  const { groupId } = use(params);
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    isOpen: isCalendarOpen,
    setIsOpen: setIsCalendarOpen,
    ref,
  } = useOutSideClickAutoClose(false);

  const handleClickChangeDayIcon = (value: string) => {
    if (value === 'prev') {
      setCurrentDate((prev) => subDays(prev, 1));
    } else {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  return (
    <div className="relative flex h-dvh w-full flex-col gap-6">
      <p className="text-lg-bold md:text-xl-bold">할 일</p>
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
            <div ref={ref} className="absolute top-0 -right-90">
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
      <DateWiseTaskList groupId={groupId} date={currentDate} />
      <ManageTaskItemModal />
    </div>
  );
}
