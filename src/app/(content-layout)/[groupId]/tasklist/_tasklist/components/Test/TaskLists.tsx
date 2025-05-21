'use client';
import clsx from 'clsx';
import { TaskList } from '../../types/task-type';
import { useState } from 'react';
import { revalidateTasks } from '../../actions/task-api';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskListPageFallBack from '../../../error';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  taskLists: TaskList[];
  date: string;
}

export default function TaskLists({ taskLists }: Props) {
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>(taskLists[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickChangeCurrentTaskList = async (taskList: TaskList) => {
    const params = new URLSearchParams(searchParams.toString());

    revalidateTasks();

    params.set('taskListId', String(taskList.id));
    router.push(`?${params.toString()}`);
    setCurrentTaskList(taskList);
  };

  return (
    <ErrorBoundary fallbackRender={({ error }) => <TaskListPageFallBack error={error} />}>
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
    </ErrorBoundary>
  );
}
