'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { TaskTest1, TaskTest2, TaskTest3 } from '../mock-data-task-list-page';
import { TaskListApiResponse } from '../types/task-list-page-type';
import TaskWiseTodoListItem from './TaskWiseTodoListItem';

const MOCK_DATA = [TaskTest1, TaskTest2, TaskTest3];

interface Props {
  date: Date;
}

export default function DateWiseTaskList({ date }: Props) {
  const [currentTask, setCurrentTask] = useState(MOCK_DATA[0]);
  const [currentTaskTodoList, setCurrentTaskTodoList] = useState(currentTask.tasks);

  const handleClickChangeCurrentTask = (task: TaskListApiResponse) => {
    setCurrentTask(task);
    setCurrentTaskTodoList(() => task.tasks);
  };

  useEffect(() => {
    setCurrentTask(MOCK_DATA[0]); // date가 바뀔때마다 일단 태스크 리스트의 첫번째로 돌아가게 구현
    // setCurrentTaskItem(바뀐 날짜에 의한 새로운 투두리스트...)
    //date가 바뀔 때마다 태스크안의 투두 아이템이 바뀌어야함
  }, [date]);

  return (
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
        {currentTaskTodoList.length > 0 ? (
          <>
            {currentTaskTodoList.map((item) => {
              return <TaskWiseTodoListItem item={item} key={item.id} />;
            })}
          </>
        ) : (
          <p className="text-md-md text-gray-500">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
          </p>
        )}
      </div>
    </div>
  );
}
