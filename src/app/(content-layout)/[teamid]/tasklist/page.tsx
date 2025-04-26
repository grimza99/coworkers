'use client';

import { useState } from 'react';
import HandleDate from './_tasklist/components/HandleDate';
import clsx from 'clsx';
import { TaskTest1, TaskTest2, TaskTest3 } from './_tasklist/mockData';
import { TaskListResponse } from './_tasklist/types/task-list-type';
import ListItems from './_tasklist/components/ListItems';
import Button from '@/components/common/Button';

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

  const handleClickCreateTaskItem = () => {
    //할일 생성 모달 띄우기
  };

  return (
    <>
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
