'use client';

import prevIcon from '@/../public/icons/prev-arrow-icon.svg';
import nextIcon from '@/../public/icons/next-arrow-icon.svg';
import calendar from '@/../public/icons/calendar.svg';
import Image from 'next/image';
import { addDays, format, subDays } from 'date-fns';

import { useState } from 'react';
import clsx from 'clsx';
import { TaskTest1, TaskTest2, TaskTest3 } from './_tasklist/mock-data-task-list-page';
import { TaskListApiResponse } from './_tasklist/types/task-list-page-type';
import ListItems from './_tasklist/components/ListItems';
import Button from '@/components/common/Button';

const MOCK_DATA = [TaskTest1, TaskTest2, TaskTest3];

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDateToKorean = format(currentDate, 'M월 dd일');

  const [currentTask, setCurrentTask] = useState(MOCK_DATA[0]);
  const [currentTaskItem, setCurrentTaskItem] = useState(currentTask.tasks);

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

  const handleClickChangeCurrentTask = (task: TaskListApiResponse) => {
    setCurrentTask(task);
    setCurrentTaskItem(() => task.tasks);
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
            <p className="text-lg-md">{formattedDateToKorean}</p>
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            {MOCK_DATA.map((task) => {
              return (
                <p
                  key={task.id}
                  onClick={() => handleClickChangeCurrentTask(task)}
                  className={clsx(
                    'text-md-md cursor-pointer',
                    task === currentTask
                      ? 'text-gray-200 underline underline-offset-6'
                      : 'text-gray-500'
                  )}
                >
                  {task.name}
                </p>
              );
            })}
          </div>
          <ListItems ListItem={currentTaskItem} />
        </div>
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
