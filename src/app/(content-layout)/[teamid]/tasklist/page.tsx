'use client';

import { useState } from 'react';
import HandleDate from './_tasklist/HandleDate';
import clsx from 'clsx';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { TaskTest1, TaskTest2, TaskTest3 } from './_tasklist/mockData';
import { TaskListResponse } from './_tasklist/types/task-list-type';

const MOCK_DATA = [TaskTest1, TaskTest2, TaskTest3];

export default function Page() {
  const [currentTask, setCurrentTask] = useState(MOCK_DATA[0]);
  const [currentTaskItem, setCurrentTaskItem] = useState(currentTask.tasks);

  const handleClickChangeCurrentTask = (task: TaskListResponse) => {
    setCurrentTask(task);
    setCurrentTaskItem(() => task.tasks);
  };

  const handleClickCreateTask = () => {
    console.log('새로운 목록');
    //새로운 목록 모달 띄우기
  };

  const handleClickPopUpDetail = () => {
    console.log('디테일');
    //디테일 할일 팝업
  };

  const handleClickItemEdit = () => {
    console.log('수정하기');
    //수정
  };

  const handleClickItemDelete = () => {
    console.log('삭제하기');
    //삭제
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg-bold md:text-xl-bold">할일</p>
      <div className="flex justify-between">
        <HandleDate />
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
        <div>
          {currentTaskItem.map((item) => {
            const [isDone, setIsDone] = useState(Boolean(item.doneAt));

            const safeFormatDate = (dateString: string | undefined | null) => {
              if (!dateString) return '';

              const date = new Date(dateString);
              if (!isValid(date)) return '';

              return format(date, 'yyyy년 MM월 dd일');
            };

            const handleClickItemStatusChange = () => {
              setIsDone((prev) => !prev);
              //done 상태로 바꾸는 api 작성
            };
            return (
              <TaskListItem
                key={item.id}
                type="taskList"
                onCheckStatusChange={handleClickItemStatusChange}
                onEdit={handleClickItemEdit}
                onDelete={handleClickItemDelete}
                onClick={handleClickPopUpDetail}
                isDone={isDone}
                description={item.description}
                commentCount={item.commentCount}
                date={safeFormatDate(item.date)}
                frequency={item.frequency}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
