'use client';
import clsx from 'clsx';
import { Task, TaskList } from '../../types/task-type';
import { useCallback, useEffect, useState } from 'react';
import { revalidateTasks } from '../../actions/task-api';
import { useRouter, useSearchParams } from 'next/navigation';
interface Props {
  groupId: string;
  taskLists: TaskList[];
  date: Date;
}

export default function TaskLists({ groupId, taskLists, date }: Props) {
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>(taskLists[0]);
  const router = useRouter();

  const handleClickChangeCurrentTaskList = async (taskList: TaskList) => {
    setCurrentTaskList(taskList);
    const data = revalidateTasks(groupId, taskList.id, date);
  };

  return (
    <div className="scrollbar-hidden flex h-fit max-w-full gap-3 overflow-x-auto overflow-y-hidden">
      {taskLists.map((taskList) => {
        return (
          <p
            key={taskList.id}
            onClick={() => handleClickChangeCurrentTaskList(taskList)}
            className={clsx(
              'text-md-md mb-1 w-fit cursor-pointer whitespace-nowrap',
              taskList === currentTaskList
                ? 'text-gray200 underline underline-offset-6'
                : 'text-gray500'
            )}
          >
            {taskList.name}
          </p>
        );
      })}
    </div>
  );
}
